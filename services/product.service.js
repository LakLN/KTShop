const Brand = require("../model/Brand");
const Category = require("../model/Category");
const Product = require("../model/Products");

// create product service
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

const getExcludedCategoryIds = async () => {
  const categories = await Category.find({ parent: { $in: excludedParents } }).select('_id');
  return categories.map(c => c._id.toString());
};


// create all product service
exports.addAllProductService = async (data) => {
  await Product.deleteMany();
  const products = await Product.insertMany(data);
  for (const product of products) {
    await Brand.findByIdAndUpdate(product.brand.id, {
      $push: { products: product._id },
    });
    await Category.findByIdAndUpdate(product.category.id, {
      $push: { products: product._id },
    });
  }
  return products;
};

// get product data
exports.getAllProductsService = async () => {
  const excludedIds = await getExcludedCategoryIds();
  return await Product.find({ category: { $nin: excludedIds } }).populate("reviews category");
};


// get type of product service
exports.getProductTypeService = async (req) => {
  const type = req.params.type;
  const query = req.query;
  const excludedIds = await getExcludedCategoryIds();

  const baseQuery = {
    productType: type,
    category: { $nin: excludedIds },
  };

  if (query.new === "true") {
    return await Product.find(baseQuery).sort({ createdAt: -1 }).limit(8).populate("reviews");
  } else if (query.featured === "true") {
    return await Product.find({ ...baseQuery, featured: true }).populate("reviews");
  } else if (query.topSellers === "true") {
    return await Product.find(baseQuery).sort({ sellCount: -1 }).limit(8).populate("reviews");
  } else {
    return await Product.find(baseQuery).populate("reviews");
  }
};

// get offer product service
exports.getOfferTimerProductService = async (type) => {
  const excludedIds = await getExcludedCategoryIds();
  return await Product.find({
    productType: type,
    category: { $nin: excludedIds },
    "offerDate.endDate": { $gt: new Date() },
  }).populate("reviews");
};


// get popular product service by type
exports.getPopularProductServiceByType = async (type) => {
  const excludedIds = await getExcludedCategoryIds();
  return await Product.find({
    productType: type,
    category: { $nin: excludedIds }
  })
    .sort({ "reviews.length": -1 })
    .limit(8)
    .populate("reviews");
};


exports.getTopRatedProductService = async () => {
  const products = await Product.find({
    reviews: { $exists: true, $ne: [] },
  }).populate("reviews");

  const topRatedProducts = products.map((product) => {
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / product.reviews.length;

    return {
      ...product.toObject(),
      rating: averageRating,
    };
  });

  topRatedProducts.sort((a, b) => b.rating - a.rating);

  return topRatedProducts;
};

// get product data
exports.getProductService = async (id) => {
  const product = await Product.findById(id).populate({
    path: "reviews",
    populate: { path: "userId", select: "name email imageURL" },
  });
  return product;
};

// get product data
exports.getRelatedProductService = async (productId) => {
  const currentProduct = await Product.findById(productId);

  const relatedProducts = await Product.find({
    "category.name": currentProduct.category.name,
    _id: { $ne: productId }, // Exclude the current product ID
  });
  return relatedProducts;
};

// update a product
exports.updateProductService = async (id, currProduct) => {
  // console.log('currProduct',currProduct)
  const product = await Product.findById(id);
  if (product) {
    product.title = currProduct.title;
    product.brand.name = currProduct.brand.name;
    product.brand.id = currProduct.brand.id;
    product.category.name = currProduct.category.name;
    product.category.id = currProduct.category.id;
    product.sku = currProduct.sku;
    product.img = currProduct.img;
    product.slug = currProduct.slug;
    product.unit = currProduct.unit;
    product.imageURLs = currProduct.imageURLs;
    product.tags = currProduct.tags;
    product.parent = currProduct.parent;
    product.children = currProduct.children;
    product.price = currProduct.price;
    product.discount = currProduct.discount;
    product.quantity = currProduct.quantity;
    product.status = currProduct.status;
    product.productType = currProduct.productType;
    product.description = currProduct.description;
    product.additionalInformation = currProduct.additionalInformation;
    product.offerDate.startDate = currProduct.offerDate.startDate;
    product.offerDate.endDate = currProduct.offerDate.endDate;

    await product.save();
  }

  return product;
};



// get Reviews Products
exports.getReviewsProducts = async () => {
  const result = await Product.find({
    reviews: { $exists: true, $ne: [] },
  })
    .populate({
      path: "reviews",
      populate: { path: "userId", select: "name email imageURL" },
    });

  const products = result.filter(p => p.reviews.length > 0)

  return products;
};

// get Reviews Products
exports.getStockOutProducts = async () => {
  const result = await Product.find({ status: "out-of-stock" }).sort({ createdAt: -1 })
  return result;
};

// get Reviews Products
exports.deleteProduct = async (id) => {
  const result = await Product.findByIdAndDelete(id)
  return result;
};