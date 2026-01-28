const express = require("express");
const router = express.Router();

const {SeachProductsController} = require("../Controller/SearchController");

router.get("/Search" , SeachProductsController);

module.exports = router;