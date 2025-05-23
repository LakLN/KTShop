const { Coupon } = require('../model');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// Thêm 1 coupon
const addCoupon = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.start_time) {
      data.start_time = new Date();
    }
    await Coupon.create(data);
    res.send({ message: 'Coupon Added Successfully!' });
  } catch (error) {
    next(error);
  }
};

// Thêm nhiều coupon (xoá hết cũ rồi thêm mới)
const addAllCoupon = async (req, res, next) => {
  try {
    await Coupon.destroy({ where: {} });
    await Coupon.bulkCreate(req.body);
    res.status(200).send({
      message: 'Coupon Added successfully!',
    });
  } catch (error) {
    next(error);
  }
};

// Lấy toàn bộ coupon
const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll({
      order: [['id', 'DESC']],
    });
    res.send(coupons);
  } catch (error) {
    next(error);
  }
};

// Lấy coupon theo id
const getCouponById = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    res.send(coupon);
  } catch (error) {
    next(error);
  }
};

// Cập nhật coupon
const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (coupon) {
      coupon.title = req.body.title;
      coupon.coupon_code = req.body.coupon_code;
      coupon.end_time = req.body.end_time; // hoặc dayjs(req.body.end_time).utc().toDate() nếu cần
      coupon.discount_percentage = req.body.discount_percentage;
      coupon.minimum_amount = req.body.minimum_amount;
      coupon.product_type = req.body.product_type;
      coupon.logo = req.body.logo;
      await coupon.save();
      res.send({ message: 'Coupon Updated Successfully!' });
    } else {
      res.status(404).send({ message: 'Coupon not found!' });
    }
  } catch (error) {
    next(error);
  }
};

// Xoá coupon
const deleteCoupon = async (req, res, next) => {
  try {
    await Coupon.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      success: true,
      message: 'Coupon delete successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
