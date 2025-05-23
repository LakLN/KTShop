const ApiError = require('../errors/api-error');
const { Brand, Product } = require('../model'); // Lưu ý cần define association ở models/index.js nếu muốn include Product

// Thêm mới 1 Brand
exports.addBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

// Thêm mới toàn bộ Brand (xoá hết cũ rồi thêm mới)
exports.addAllBrandService = async (data) => {
  await Brand.destroy({ where: {} });
  const brands = await Brand.bulkCreate(data);
  return brands;
};

// Lấy tất cả Brand active (kèm products nếu muốn)
exports.getBrandsService = async () => {
  const brands = await Brand.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Product,
        as: 'products', // chỉ dùng khi đã khai báo association
        required: false
      }
    ]
  });
  return brands;
};

// Xoá Brand theo id
exports.deleteBrandsService = async (id) => {
  const deleted = await Brand.destroy({ where: { id } });
  return deleted; // trả về số bản ghi đã xoá (0|1)
};

// Cập nhật Brand
exports.updateBrandService = async (id, payload) => {
  const isExist = await Brand.findByPk(id);

  if (!isExist) {
    throw new ApiError(404, 'Brand not found !');
  }

  await Brand.update(payload, { where: { id } });
  const result = await Brand.findByPk(id);
  return result;
};

// Lấy Brand theo id
exports.getSingleBrandService = async (id) => {
  const result = await Brand.findByPk(id);
  return result;
};
