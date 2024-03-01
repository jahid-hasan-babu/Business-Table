const express = require("express");
const router = express.Router();
const ProductsController = require("../controller/ProductsController");

router.get(
  "/ProductsList/:pageNo/:perPage/:searchKey?",
  ProductsController.ProductList
);

module.exports = router;
