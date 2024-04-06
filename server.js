const express = require("express");
require("./config/db");
require("dotenv").config();
const { createAdminAccount } = require("./controller/user.controller");

const app = express();
app.use(express.json());

//route
const userRouter = require("./route/user.route");
const clientRouter = require("./route/client.route");
const projectRouter = require("./route/project.route");

app.use("/user", userRouter);
app.use("/client", clientRouter);
app.use("/project",projectRouter);
app.listen(3000, () => {
  console.log("server work !! ");
  createAdminAccount();
});
