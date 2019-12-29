const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");

module.exports.read = (req, res) => {
  return res.json(req.category);
};

module.exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "Category does not exists"
      });
    }
    req.category = category;
    next();
  });
};
module.exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      data
    });
  });
};

module.exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, deleteCategory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Category deleted successfully"
    });
  });
};

module.exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

module.exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
