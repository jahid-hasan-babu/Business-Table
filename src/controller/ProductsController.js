const ProductsModel = require("../model/ProductsModel");

exports.ProductList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKey;
    const skipRow = (pageNo - 1) * perPage;
    let data;
    if (searchValue !== 0) {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = { $or: [{ title: SearchRgx }, { brand: SearchRgx }] }; //we can search anything field
      data = await ProductsModel.aggregate([
        {
          $facet: {
            Total: [{ $match: SearchQuery }, { $count: "count" }],
            Rows: [
              { $match: SearchQuery },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      Total = (await ProductsModel.aggregate([{ $count: "total" }]))[0][
        "total"
      ];
      Rows = await ProductsModel.aggregate([
        { $skip: skipRow },
        { $limit: perPage },
      ]);
    }
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "fail", error: e });
  }
};
