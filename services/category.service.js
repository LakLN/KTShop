const ApiError = require('../errors/api-error');
const { Category, Product } = require('../model');

// Tạo mới 1 category
exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

// Thêm mới toàn bộ categories (xoá hết cũ, rồi thêm mới)
exports.addAllCategoryService = async (data) => {
  await Category.destroy({ where: {} });
  const categories = await Category.bulkCreate(data);
  return categories;
};

// Lấy category có status 'Show' (và kèm products nếu có)
exports.getShowCategoryServices = async () => {
  const categories = await Category.findAll({
    where: { status: 'Show' },
    include: [
      {
        model: Product,
        as: 'products', // cần define association
        required: false,
      }
    ]
  });
  return categories;
};

// Lấy toàn bộ categories
exports.getAllCategoryServices = async () => {
  const categories = await Category.findAll();
  return categories;
};

// Lấy categories theo product_type (và kèm products nếu cần)
exports.getCategoryTypeService = async (param) => {
  const categories = await Category.findAll({
    where: { product_type: param },
    include: [
      {
        model: Product,
        as: 'products', // cần define association
        required: false,
      }
    ]
  });
  return categories;
};

// Xoá category theo id
exports.deleteCategoryService = async (id) => {
  const deleted = await Category.destroy({ where: { id } });
  return deleted; // trả về số bản ghi đã xoá (0|1)
};

// Update category
exports.updateCategoryService = async (id, payload) => {
  const isExist = await Category.findByPk(id);
  if (!isExist) {
    throw new ApiError(404, 'Category not found !');
  }
  await Category.update(payload, { where: { id } });
  const result = await Category.findByPk(id);
  return result;
};

// Lấy single category theo id
exports.getSingleCategoryService = async (id) => {
  const result = await Category.findByPk(id);
  return result;
};

// Lấy toàn bộ categories trừ những parent không mong muốn (filtered)
exports.getAllCategoryServicesFiltered = async (excluded) => {
  const categories = await Category.findAll({
    where: {
      parent: { [require('sequelize').Op.notIn]: excluded }
    },
    include: [
      {
        model: Product,
        as: 'products',
        required: false,
      }
    ]
  });
  return categories;
};
