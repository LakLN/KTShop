const { Coupon } = require("../model"); 

// Thêm 1 coupon
const addCoupon = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.start_time) data.start_time = new Date();
    await Coupon.create(data);
    res.json({ message: 'Coupon Added Successfully!' });
  } catch (error) {
    next(error);
  }
};

// Thêm nhiều coupon (xoá hết cũ rồi thêm mới)
const addAllCoupon = async (req, res, next) => {
  try {
    await Coupon.destroy({ where: {} });
    await Coupon.bulkCreate(req.body);
    res.json({ message: 'Coupon Added successfully!' });
  } catch (error) {
    next(error);
  }
};

// Lấy toàn bộ coupon
const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll({ order: [['id', 'DESC']] });
    res.json(coupons);
  } catch (error) {
    next(error);
  }
};

// Lấy coupon theo id
const getCouponById = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found!' });
    res.json(coupon);
  } catch (error) {
    next(error);
  }
};

// Cập nhật coupon
const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found!' });
    await coupon.update(req.body);
    res.json({ message: 'Coupon Updated Successfully!' });
  } catch (error) {
    next(error);
  }
};

// Xoá coupon
const deleteCoupon = async (req, res, next) => {
  try {
    const deleted = await Coupon.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Coupon not found!' });
    res.json({ message: 'Coupon deleted successfully' });
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
