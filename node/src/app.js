const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const hostname = "0.0.0.0";
const port = 3000;

const server = express();
mongoose.connect("mongodb://localhost:27017/apinode");

server.use(cors());
server.use(express.urlencoded());
server.use(express.json());

const postRoutes = require("./api/routes/postRoutes");
postRoutes(server);
const userRoutes = require("./api/routes/userRoutes");
userRoutes(server);
const commentRoutes = require("./api/routes/commentRoutes");
commentRoutes(server);

server.listen(port, hostname);

