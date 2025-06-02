const { Order, Product, Review, User } = require("../model");
const { Op } = require("sequelize");

// Thêm 1 review
exports.addReview = async (req, res, next) => {
  const { user_id, product_id, rating, comment } = req.body;
  try {
    // Check nếu user đã review sản phẩm này
    const existingReview = await Review.findOne({
      where: { user_id, product_id }
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already left a review for this product." });
    }

    // Check user đã mua sản phẩm này chưa (cart là JSON, phải truy vấn dạng LIKE nếu dùng MySQL)
    const checkPurchase = await Order.findOne({
      where: {
        user_id,
        cart: { [Op.like]: `%${product_id}%` }
      }
    });

    if (!checkPurchase) {
      return res.status(400).json({ message: "Without purchase you can not give here review!" });
    }

    // Tạo review mới
    const review = await Review.create({
      user_id,
      product_id,
      rating,
      comment
    });

    // (Không cần push thủ công vào mảng reviews như MongoDB, chỉ cần lưu id khoá ngoại)
    // Có thể update số lượng reviews trong bảng Product hoặc User nếu muốn

    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Xoá tất cả review của 1 sản phẩm
exports.deleteReviews = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const result = await Review.destroy({ where: { product_id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Product reviews not found' });
    }
    res.json({ message: 'All reviews deleted for the product' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Lấy tất cả review của 1 sản phẩm
exports.getAllReviewsByProduct = async (req, res, next) => {
  try {
    const product_id = req.params.id; // id sản phẩm truyền trên URL
    const reviews = await Review.findAll({
      where: { product_id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar'], // lấy thông tin user review nếu muốn
        }
      ],
      order: [['createdAt', 'DESC']], // sắp xếp mới nhất lên đầu
    });

    res.json(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Lấy toàn bộ review
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Product, as: 'product', attributes: ['id', 'title'] },   // alias 'product'
        { model: User, as: 'user', attributes: ['id', 'name'] }        // alias 'user'
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

