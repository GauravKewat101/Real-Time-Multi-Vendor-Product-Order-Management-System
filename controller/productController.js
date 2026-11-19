const Product = require("../model/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, images } = req.body;

    if (req.user.role == "admin") {
      const product = await Product.create({
        name,
        description,
        price,
        stock,
        images,
        sellerId: req.user.userId,
        isActive: true,
      });

      return res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    }
    return res.status(401).json({
      message: "Not authorized",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.manageProduct = async (req, res) => {
  try {
    const { name, description, price, stock, images } = req.body;
    const { id } = req.param;

    if (req.user.role == "admin" || req.user.role == "seller") {
      const data = await Product.findOneAndUpdate(
        { _id: id },
        { name, description, price, stock, images }
      );
      if (!data) {
        return res.status(404).send({ message: "resource not found" });
      }
      res.status(201).send({
        message: "updated!",
        data: Product,
      });
    }
    res.status(500).send({ message: "Not authorized to manage product" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.role == "admin") {
      const { id } = req.param;
      await Product.findOneAndUpdate({ _id: id }, { isActive: false });
      return res.status(201).json({
        message: "Product deleted successfully",
      });
    }
    return res.status(401).json({
      message: "Not authorized",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
