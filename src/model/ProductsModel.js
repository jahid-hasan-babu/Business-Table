const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    category: { type: String },
    price: { type: String },
    brand: { type: String },
    product_code: { type: String },
    stock: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const ProductsModel = mongoose.model("products", DataSchema);
module.exports = ProductsModel;
