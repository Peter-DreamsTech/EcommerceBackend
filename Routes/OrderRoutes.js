const express = require("express");
const router = express.Router();

const VerifyToken = require("../Middleware/VerifyToken");
const IsAdmin = require("../Middleware/IsAdmin");
const {OrderController , AllOrdersView} = require("../Controller/OrderController")

router.post("/UserOrder" ,VerifyToken ,OrderController);
router.get("/AllOrders" , VerifyToken, IsAdmin, AllOrdersView);

module.exports = router;