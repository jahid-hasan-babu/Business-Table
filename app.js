const express = require("express");
const app = express();
const router = require("./src/routes/api");
const path = require("path");
require("dotenv").config();

const url = process.env.URL;

//security middleware
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

//Database
const mongoose = require("mongoose");

//Security middleware implement

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitizer());

//Rata limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//Database connection
mongoose
  .connect(url)
  .then((res) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//api call
app.use("/api/v1", router);

//Front end Tagging
app.use(express.static("client/dist"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

//undefine route
// app.use('*',(req,res)=> {
//     res.status(404).json({status:"fail",data:"Not Found"})
// })

module.exports = app;
