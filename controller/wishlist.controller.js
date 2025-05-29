const { Wishlist, Product, User } = require("../model");

// Thêm sản phẩm vào wishlist (userId, productId)
exports.addToWishlist = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;
    // Check nếu đã có
    const exist = await Wishlist.findOne({ where: { user_id, product_id } });
    if (exist) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }
    const wishlist = await Wishlist.create({ user_id, product_id });
    res.status(201).json({ message: "Added to wishlist", wishlist });
  } catch (error) {
    next(error);
  }
};

// Xoá sản phẩm khỏi wishlist (userId, productId)
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;
    const count = await Wishlist.destroy({ where: { user_id, product_id } });
    if (count === 0) {
      return res.status(404).json({ message: "Not found in wishlist" });
    }
    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    next(error);
  }
};

// Lấy toàn bộ wishlist của user
exports.getWishlistByUser = async (req, res, next) => {
  try {
    // Có thể lấy userId từ token hoặc từ params
    const user_id = req.params.user_id || req.user.id;
    const wishlists = await Wishlist.findAll({
      where: { user_id },
      include: [{ model: Product, as: "product" }]
    });
    res.json({ wishlist: wishlists });
  } catch (error) {
    next(error);
  }
};

// Kiểm tra 1 sản phẩm có trong wishlist của user không
exports.checkWishlist = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.query;
    const exist = await Wishlist.findOne({ where: { user_id, product_id } });
    res.json({ inWishlist: !!exist });
  } catch (error) {
    next(error);
  }
};
