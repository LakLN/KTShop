const productServices = require("../services/product.service");

const excludedParents = [
  "Facial Care",
  "Awesome Lip Care",
  "Beauty of Skin",
  "Discover Skincare",
  "Bluetooth",
  "Smart Watch",
  "CPU Heat Pipes",
  "Mobile Tablets",
  "Headphones"
];

// Thêm sản phẩm mới
exports.addProduct = async (req, res, next) => {
  try {
    const firstItem = {
      color: {
        name: '',
        clrCode: ''
      },
      img: req.body.img,
    };
    const imageURLs = [firstItem, ...(req.body.imageURLs || [])];
    const result = await productServices.createProductService({
      ...req.body,
      image_urls: imageURLs, // đổi đúng theo schema Sequelize
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
