const express = require("express");
const router = express.Router();

const VerifyToken = require("../Middleware/VerifyToken");
const IsAdmin = require("../Middleware/IsAdmin");
const {OrderController , AllOrdersView, OrderCancelController} = require("../Controller/OrderController")

router.post("/UserOrder" ,VerifyToken ,OrderController);
router.get("/AllOrders" , VerifyToken, IsAdmin, AllOrdersView);
router.delete("/CancelOrders/:id" , VerifyToken, OrderCancelController);

module.exports = router;