  const { Brand } = require('../model');
  const brandService = require('../services/brand.service');

  // Add a brand
  exports.addBrand = async (req, res, next) => {
    try {
      const result = await brandService.addBrandService(req.body);
      res.status(200).json({
        status: "success",
        message: "Brand created successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Add all brands (bulk)
  exports.addAllBrand = async (req, res, next) => {
    try {
      const result = await brandService.addAllBrandService(req.body);
      res.json({
        message: 'Brands added successfully',
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get all brands
  exports.getAllBrands = async (req, res, next) => {
    try {
      // Sequelize: attributes chọn trường
      const result = await Brand.findAll({
        attributes: ['id', 'name', 'email', 'logo', 'website', 'location', 'status']
      });
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get active brands only
  exports.getActiveBrands = async (req, res, next) => {
    try {
      const result = await Brand.findAll({
        where: { status: 'active' }
      });
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete brand
  exports.deleteBrand = async (req, res, next) => {
    try {
      await Brand.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        success: true,
        message: 'Brand delete successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Update brand
  exports.updateBrand = async (req, res, next) => {
    try {
      const [updatedCount, updatedRows] = await Brand.update(req.body, {
        where: { id: req.params.id },
        returning: true, // cần thiết cho PostgreSQL, với MySQL phải .findByPk sau khi update
      });
      let result = null;
      if (updatedCount > 0) {
        result = await Brand.findByPk(req.params.id);
      }
      res.status(200).json({
        status: true,
        message: 'Brand update successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get single brand
  exports.getSingleBrand = async (req, res, next) => {
    try {
      const result = await Brand.findByPk(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
// Xóa mềm (soft delete)
exports.softDeleteBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await Brand.update(
      { status: "inactive" },
      { where: { id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Brand not found!" });
    }
    res.status(200).json({
      success: true,
      message: 'Brand soft deleted (inactive) successfully',
    });
  } catch (error) {
    next(error);
  }
};
// Đổi trạng thái brand
exports.changeBrandStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status!" });
    }
    const id = req.params.id;
    const updated = await Brand.update(
      { status },
      { where: { id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Brand not found!" });
    }
    res.status(200).json({
      success: true,
      message: `Brand status changed to ${status}`,
    });
  } catch (error) {
    next(error);
  }
};
