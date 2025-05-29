const express = require("express");
const router = express.Router();
const wishlistController = require("../controller/wishlist.controller");
const verifyToken = require("../middleware/verifyToken"); // Nếu có xác thực user

// Thêm vào wishlist
router.post("/add", verifyToken, wishlistController.addToWishlist);
// Xoá khỏi wishlist
router.delete("/remove", verifyToken, wishlistController.removeFromWishlist);
// Lấy wishlist theo user
router.get("/:user_id", verifyToken, wishlistController.getWishlistByUser);
// Kiểm tra 1 sản phẩm đã wishlist chưa
router.get("/check/one", verifyToken, wishlistController.checkWishlist);

module.exports = router;
