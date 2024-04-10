const express = require("express");
require("./config/db");
require("dotenv").config();
require('./controller/cronjob.script') ; 

const cors = require('cors');
const { createAdminAccount } = require("./controller/user.controller");

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

//route
const userRouter = require("./route/user.route");
const clientRouter = require("./route/client.route");
const projectRouter = require("./route/project.route");
const boardRouter = require("./route/board.route" ) ; 


app.use("/user", userRouter);
app.use("/client", clientRouter);
app.use("/project",projectRouter);
app.use("/board",boardRouter) ; 
app.use('/storage', express.static('./storage'));
app.use('/projectdoc', express.static('./projectDoc'));


app.listen(3000, () => {
  console.log("server work !! ");
  createAdminAccount();
});
