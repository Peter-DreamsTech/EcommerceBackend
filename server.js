const express = require("express");
const app = express();
require("dotenv").config();

const DB = require("./Config/db");

app.use(express.json());

DB();

const User = require("./Routes/UserRoutes");
const Product = require("./Routes/ProductRoutes");
const Order = require("./Routes/OrderRoutes");

app.use("/BasicRevise", User);
app.use("/BasicRevise" , Product);
app.use("/BasicRevise" , Order);

app.listen(process.env.PORT , ()=>{
    console.log("server is running in Port http://localhost:"+process.env.PORT)
});