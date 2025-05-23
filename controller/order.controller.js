const { secret } = require("../config/secret");
const stripe = require("stripe")(secret.stripe_key);
const { Order, User } = require("../model"); // Lấy models từ Sequelize

// Tạo payment intent với Stripe
exports.paymentIntent = async (req, res, next) => {
  try {
    const product = req.body;
    const price = Number(product.price);
    const amount = price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Thêm order mới
exports.addOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json({
      success: true,
      message: "Order added successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Lấy tất cả orders (có thể include user nếu muốn)
exports.getOrders = async (req, res, next) => {
  try {
    const orderItems = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user', // Chỉ dùng được nếu đã define association!
          required: false
        }
      ],
      order: [['id', 'DESC']]
    });
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Lấy một order theo id (có thể include user nếu muốn)
exports.getSingleOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          required: false
        }
      ]
    });
    res.status(200).json(orderItem);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update status order
exports.updateOrderStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    await Order.update(
      { status: newStatus },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
