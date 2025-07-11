const categoryServices = require("../services/category.service");
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


// add category
exports.addCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "Category created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// add all category
exports.addAllCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.addAllCategoryService(req.body);
    res.json({
      message:'Category added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// add all category
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

// add all category
// add this in your getAllCategory function:
// get all category (exclude unwanted ones)
exports.getAllCategory = async (req, res, next) => {
  try {
    const excludeCategories = [
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

    const result = await categoryServices.getAllCategoryServicesFiltered(excludeCategories);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};




// add all category
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


// delete category
exports.deleteCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.deleteCategoryService(req.params.id);
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// update category
exports.updateCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.updateCategoryService(req.params.id,req.body);
    res.status(200).json({
      status:'success',
      message:'Category update successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get single category
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
