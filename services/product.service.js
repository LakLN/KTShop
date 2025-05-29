const { Op } = require("sequelize");
const { Brand, Category, Product, Review, User } = require("../model");

// Loại các parent không dùng
const excludedParents = [
  "Facial Care", "Awesome Lip Care", "Beauty of Skin", "Discover Skincare",
  "Bluetooth", "Smart Watch", "CPU Heat Pipes", "Mobile Tablets", "Headphones"
];

// Lấy id các category bị loại
const getExcludedCategoryIds = async () => {
  const categories = await Category.findAll({
    where: { parent: { [Op.in]: excludedParents } },
    attributes: ['id']
  });
  return categories.map(c => c.id);
};

// Thêm toàn bộ sản phẩm (xóa hết cũ, thêm mới)
exports.addAllProductService = async (data) => {
  await Product.destroy({ where: {} });
  const products = await Product.bulkCreate(data);
  // **Lưu ý:** Bạn nên dùng bảng trung gian, tránh thao tác push từng id như Mongoose!
  return products;
};

// Lấy tất cả sản phẩm (không lấy category bị exclude)
exports.getAllProductsService = async () => {
  const excludedIds = await getExcludedCategoryIds();
  return await Product.findAll({
    where: { category_id: { [Op.notIn]: excludedIds } },
    include: [
      { model: Review, as: 'reviews' },
      { model: Category, as: 'category' }
    ]
  });
};

// Lấy sản phẩm theo type
exports.getProductTypeService = async (req) => {
  const type = req.params.type;
  const query = req.query;
  const excludedIds = await getExcludedCategoryIds();

  const baseQuery = {
    where: {
      product_type: type,
      category_id: { [Op.notIn]: excludedIds }
    },
    include: [{ model: Review, as: 'reviews' }]
  };

  if (query.new === "true") {
    return await Product.findAll({
      ...baseQuery,
      order: [['created_at', 'DESC']],
      limit: 8
    });
  } else if (query.featured === "true") {
    return await Product.findAll({
      ...baseQuery,
      where: { ...baseQuery.where, featured: true }
    });
  } else if (query.topSellers === "true") {
    return await Product.findAll({
      ...baseQuery,
      order: [['sell_count', 'DESC']],
      limit: 8
    });
  } else {
    return await Product.findAll(baseQuery);
  }
};

// Lấy sản phẩm đang có offer (endDate lớn hơn hiện tại)
exports.getOfferTimerProductService = async (type) => {
  const excludedIds = await getExcludedCategoryIds();
  return await Product.findAll({
    where: {
      product_type: type,
      category_id: { [Op.notIn]: excludedIds },
      offer_end_date: { [Op.gt]: new Date() }
    },
    include: [{ model: Review, as: 'reviews' }]
  });
};

// Lấy sản phẩm phổ biến theo type (nhiều review nhất)
exports.getPopularProductServiceByType = async (type) => {
  const excludedIds = await getExcludedCategoryIds();
  // Lấy ra tất cả rồi sort JS, vì count review chưa join được
  const products = await Product.findAll({
    where: {
      product_type: type,
      category_id: { [Op.notIn]: excludedIds }
    },
    include: [{ model: Review, as: 'reviews' }]
  });
  // Sort theo số review (đếm reviews array length)
  products.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
  return products.slice(0, 8);
};

// Lấy sản phẩm top rated (trung bình rating cao nhất)
exports.getTopRatedProductService = async () => {
  const products = await Product.findAll({
    include: [{ model: Review, as: 'reviews' }]
  });

  // Tính trung bình rating và sort (JS)
  const topRatedProducts = products
    .filter(p => p.reviews && p.reviews.length > 0)
    .map(product => {
      const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / product.reviews.length;
      return { ...product.toJSON(), rating: averageRating };
    })
    .sort((a, b) => b.rating - a.rating);

  return topRatedProducts;
};

// Lấy 1 sản phẩm (và populate reviews kèm user)
exports.getProductService = async (id) => {
  const product = await Product.findByPk(id, {
    include: [{
      model: Review,
      as: 'reviews',
      include: [{ model: User, as: 'user', attributes: ['name', 'email', 'image_url'] }]
    }]
  });
  return product;
};

// Lấy sản phẩm liên quan (cùng category name, khác id hiện tại)
exports.getRelatedProductService = async (productId) => {
  const currentProduct = await Product.findByPk(productId, {
    include: [{ model: Category, as: 'category' }]
  });

  if (!currentProduct || !currentProduct.category) return [];

  const relatedProducts = await Product.findAll({
    where: {
      category_id: currentProduct.category_id,
      id: { [Op.ne]: productId }
    }
  });
  return relatedProducts;
};

// Update sản phẩm
exports.updateProductService = async (id, currProduct) => {
  const product = await Product.findByPk(id);
  if (product) {
    await Product.update(currProduct, { where: { id } });
    return await Product.findByPk(id);
  }
  return null;
};

// Lấy sản phẩm có reviews
exports.getReviewsProducts = async () => {
  const products = await Product.findAll({
    include: [{
      model: Review,
      as: 'reviews',
      include: [{ model: User, as: 'user', attributes: ['name', 'email', 'image_url'] }]
    }]
  });
  return products.filter(p => p.reviews && p.reviews.length > 0);
};

// Lấy sản phẩm hết hàng
exports.getStockOutProducts = async () => {
  const result = await Product.findAll({
    where: { status: "out-of-stock" },
    order: [['created_at', 'DESC']]
  });
  return result;
};

// Xoá sản phẩm
exports.deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};

// Thêm sản phẩm mới (1 sản phẩm)
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};
