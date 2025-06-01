const categoryServices = require("../services/category.service");

// Danh sách parent không cho phép hiển thị
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

// Thêm 1 category
exports.addCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "Category created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Thêm nhiều category cùng lúc
exports.addAllCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.addAllCategoryService(req.body);
    res.json({
      message: "Category added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả category có status "Show" và không thuộc excludedParents
exports.getShowCategory = async (req, res, next) => {
  try {
    const all = await categoryServices.getShowCategoryServices();
    const result = all.filter(c => !excludedParents.includes(c.parent));
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả category (ngoại trừ 1 số parent bị exclude)
exports.getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.getAllCategoryServicesFiltered(excludedParents);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy category theo loại product_type (và loại bỏ excludedParents)
exports.getProductTypeCategory = async (req, res, next) => {
  try {
    const all = await categoryServices.getCategoryTypeService(req.params.type);
    const result = all.filter(c => !excludedParents.includes(c.parent));
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Xoá category
exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.deleteCategoryService(req.params.id);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật category
exports.updateCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.updateCategoryService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Category update successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy 1 category theo id (và loại trừ parent không hợp lệ)
exports.getSingleCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.getSingleCategoryService(req.params.id);

    if (!result || excludedParents.includes(result.parent)) {
      return res.status(404).json({
        success: false,
        message: "Category not found or is restricted"
      });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// Xoá mềm category (chuyển status thành "Hide")
exports.softDeleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await categoryServices.updateCategoryService(id, { status: "Hide" });
    res.status(200).json({
      success: true,
      message: "Category has been hidden (soft deleted)",
      result: updated
    });
  } catch (error) {
    next(error);
  }
};
