  const { Op, fn, col, literal, where, QueryTypes } = require("sequelize");
  const { Order, Product, Category, User, sequelize } = require("../model");
  const dayjs = require("dayjs");

  // 1. Lấy tất cả đơn hàng theo user
 module.exports.getOrderByUser = async (req, res, next) => {
  try {
    const { page = 1, limit = 8, user_id } = req.query; // thêm user_id vào query
    const offset = (page - 1) * limit;

    if (!user_id) {
      return res.status(400).json({ success: false, message: "Missing user_id in query" });
    }

    const whereUser = { user_id }; // lấy user_id từ query

    // Đếm tổng số đơn hàng
    const totalDoc = await Order.count({ where: whereUser });

    // Đếm số lượng & tổng tiền từng trạng thái
    const statusList = ["pending", "processing", "delivered"];
    let result = {};
    for (let status of statusList) {
      const { count, total } = await Order.findOne({
        attributes: [
          [fn("COUNT", col("id")), "count"],
          [fn("SUM", col("total_amount")), "total"]
        ],
        where: { ...whereUser, status }
      }) || { count: 0, total: 0 };
      result[status] = count || 0;
    }

    // Lấy danh sách đơn hàng (phân trang)
    const orders = await Order.findAll({
      where: whereUser,
      order: [["id", "DESC"]],
      limit: Number(limit),
      offset
    });

    res.send({
      orders,
      pending: result.pending,
      processing: result.processing,
      delivered: result.delivered,
      totalDoc,
    });
  } catch (error) {
    next(error);
  }
};

  // 2. Lấy đơn hàng theo id
  module.exports.getOrderById = async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.id);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      next(error);
    }
  };

  // 3. Dashboard: tổng tiền hôm nay, hôm qua, tháng, tất cả, phân loại theo payment
  exports.getDashboardAmount = async (req, res, next) => {
    try {
      // Lấy các mốc thời gian
      const todayStart = dayjs().startOf("day").toDate();
      const todayEnd = dayjs().endOf("day").toDate();
      const yesterdayStart = dayjs().subtract(1, "day").startOf("day").toDate();
      const yesterdayEnd = dayjs().subtract(1, "day").endOf("day").toDate();
      const monthStart = dayjs().startOf("month").toDate();
      const monthEnd = dayjs().endOf("month").toDate();

      // Helper function lấy dữ liệu tổng cho từng payment method
      const calcPayment = (orders, method) =>
        orders.filter(o => o.payment_method === method)
          .reduce((total, o) => total + Number(o.total_amount || 0), 0);

      // Đơn hàng hôm nay
      const todayOrders = await Order.findAll({
        where: {
          created_at: { [Op.between]: [todayStart, todayEnd] }
        }
      });
      const todayOrderAmount = todayOrders.reduce((t, o) => t + Number(o.total_amount), 0);
      const todayCashPaymentAmount = calcPayment(todayOrders, "COD");
      const todayCardPaymentAmount = calcPayment(todayOrders, "Card");

      // Hôm qua
      const yesterdayOrders = await Order.findAll({
        where: {
          created_at: { [Op.between]: [yesterdayStart, yesterdayEnd] }
        }
      });
      const yesterdayOrderAmount = yesterdayOrders.reduce((t, o) => t + Number(o.total_amount), 0);
      const yesterDayCashPaymentAmount = calcPayment(yesterdayOrders, "COD");
      const yesterDayCardPaymentAmount = calcPayment(yesterdayOrders, "Card");

      // Tháng này
      const monthlyOrders = await Order.findAll({
        where: {
          created_at: { [Op.between]: [monthStart, monthEnd] }
        }
      });
      const monthlyOrderAmount = monthlyOrders.reduce((t, o) => t + Number(o.total_amount), 0);

      // Tổng cộng
      const totalOrders = await Order.findAll();
      const totalOrderAmount = totalOrders.reduce((t, o) => t + Number(o.total_amount), 0);

      res.status(200).send({
        todayOrderAmount,
        yesterdayOrderAmount,
        monthlyOrderAmount,
        totalOrderAmount,
        todayCardPaymentAmount,
        todayCashPaymentAmount,
        yesterDayCardPaymentAmount,
        yesterDayCashPaymentAmount,
      });
    } catch (error) {
      next(error);
    }
  };

  // 4. Báo cáo doanh số 7 ngày gần nhất
  exports.getSalesReport = async (req, res, next) => {
    try {
      const startOfWeek = dayjs().subtract(7, 'day').startOf('day').toDate();
      const endOfWeek = dayjs().endOf('day').toDate();

      const salesOrderChartData = await Order.findAll({
        where: {
          updated_at: {
            [Op.between]: [startOfWeek, endOfWeek]
          }
        }
      });

      const salesReport = {};
      salesOrderChartData.forEach(value => {
        const onlyDate = dayjs(value.updated_at).format("YYYY-MM-DD");
        if (!salesReport[onlyDate]) {
          salesReport[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        }
        salesReport[onlyDate].total += Number(value.total_amount);
        salesReport[onlyDate].order += 1;
      });

      const salesReportData = Object.values(salesReport);

      res.status(200).json({ salesReport: salesReportData });
    } catch (error) {
      next(error);
    }
  };

  // 5. Thống kê 5 category bán chạy nhất (dựa vào dữ liệu cart JSON)
  exports.mostSellingCategory = async (req, res, next) => {
    try {
      // Nếu bạn có bảng trung gian order_product (nên có!), JOIN lấy group luôn
      // Còn nếu cart lưu JSON, bạn phải scan toàn bộ order và group bằng JS
      const orders = await Order.findAll();
      // Gom các productType trong cart (cart: array of products)
      const categoryMap = {};
      orders.forEach(order => {
        let cart = [];
try {
  if (typeof order.cart === 'string') {
    cart = JSON.parse(order.cart);
  } else {
    cart = order.cart;
  }
} catch {}
if (!Array.isArray(cart)) cart = [];
cart.forEach(item => {
  const type = item.productType;
  const quantity = Number(item.orderQuantity || 1);
  if (!categoryMap[type]) categoryMap[type] = 0;
  categoryMap[type] += quantity;
});

      });
      // Chuyển về mảng, sort giảm dần
      const categoryData = Object.entries(categoryMap)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      res.status(200).json({ categoryData });
    } catch (error) {
      next(error);
    }
  };

  // 6. Đơn hàng dashboard (gần đây)
  exports.getDashboardRecentOrder = async (req, res, next) => {
    try {
      const { page = 1, limit = 8 } = req.query;
      const offset = (page - 1) * limit;

      // Lọc theo status hợp lệ
      const queryObject = {
        status: { [Op.in]: ["pending", "processing", "delivered", "cancel"] }
      };

      const totalDoc = await Order.count({ where: queryObject });

      const orders = await Order.findAll({
        where: queryObject,
        order: [["updated_at", "DESC"]],
        attributes: [
          "invoice", "created_at", "updated_at", "payment_method", "name",
          "user_id", "total_amount", "status"
        ],
        limit: Number(limit),
        offset
      });

      res.status(200).send({
        orders,
        page: Number(page),
        limit: Number(limit),
        totalOrder: totalDoc,
      });
    } catch (error) {
      next(error);
    }
  };
