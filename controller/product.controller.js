// Thêm sản phẩm mới
const productServices = require("../services/product.service");
const cloudinary = require('../utils/cloudinary');
const { Brand, Category, Product, Review, User } = require("../model");

// Thêm sản phẩm mới với upload ảnh lên cloudinary
exports.addProduct = async (req, res, next) => {
  try {
    // Upload field img
    let mainImgUrl = "";
    if (req.files && req.files['img'] && req.files['img'][0]) {
      mainImgUrl = req.files['img'][0].path; // Cloudinary sẽ trả về .path là URL public
    }

    // Upload các ảnh phụ (nếu có)
    let imageURLs = [];
    if (req.files && req.files['imageURLs']) {
      imageURLs = req.files['imageURLs'].map(file => ({
        color: { name: '', clrCode: '' }, // sửa theo UI của bạn
        img: file.path
      }));
    }

    // Nếu có dữ liệu imageURLs từ body (dạng json), merge luôn
    if (req.body.imageURLs) {
      let bodyImages = [];
      try {
        bodyImages = JSON.parse(req.body.imageURLs);
      } catch (err) { /* ignore parse error */ }
      imageURLs = imageURLs.concat(bodyImages);
    }

    const result = await productServices.createProductService({
      ...req.body,
      img: mainImgUrl,
      image_urls: imageURLs
    });

    res.status(200).json({
      success: true,
      status: "success",
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// Thêm nhiều sản phẩm
exports.addAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.addAllProductService(req.body);
    res.json({
      message: 'Products added successfully',
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy toàn bộ sản phẩm
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProductsService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm theo type
exports.getProductsByType = async (req, res, next) => {
  try {
    const result = await productServices.getProductTypeService(req);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm có offer (theo type)
exports.getOfferTimerProducts = async (req, res, next) => {
  try {
    const result = await productServices.getOfferTimerProductService(req.query.type);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm phổ biến theo type
exports.getPopularProductByType = async (req, res, next) => {
  try {
    const result = await productServices.getPopularProductServiceByType(req.params.type);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm top rated
exports.getTopRatedProducts = async (req, res, next) => {
  try {
    const result = await productServices.getTopRatedProductService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm theo id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productServices.getProductService(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm liên quan
exports.getRelatedProducts = async (req, res, next) => {
  try {
    const products = await productServices.getRelatedProductService(req.params.id);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productServices.updateProductService(req.params.id, req.body);
    res.send({ data: product, message: "Product updated successfully!" });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm có reviews
exports.reviewProducts = async (req, res, next) => {
  try {
    const products = await productServices.getReviewsProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy sản phẩm hết hàng
exports.stockOutProducts = async (req, res, next) => {
  try {
    const products = await productServices.getStockOutProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Xoá sản phẩm
exports.deleteProduct = async (req, res, next) => {
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json({
      message: 'Product delete successfully'
    });
  } catch (error) {
    next(error);
  }
};
// Xoá mềm: chỉ cập nhật status = "discontinued"
exports.softDeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Product.update(
      { status: "discontinued" },
      { where: { id } }
    );
    if (result[0] === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product soft deleted (discontinued)!" });
  } catch (error) {
    next(error);
  }
};
exports.getActiveProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { status: { [Op.ne]: "discontinued" } }
    });
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
