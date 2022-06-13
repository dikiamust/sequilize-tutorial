const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./db/db");
const authRouter = require("./modules/auth/routes/auth.routes");
const videoRouter = require("./modules/video/routes/video.routes");
const inquiryRouter = require("./modules/inquiry/routes/inquiry.routes");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const notFoundRout = require("./utils/notFoundRout");
const errorHandlerMiddleware = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :response-time :status"));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(corsOptions));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("homepage"));
app.get("/page/login", (req, res) => res.render("tes"));
app.get("/page/register", (req, res) => res.render("register_page"));
app.get("/page/maps", (req, res) => res.render("maps"));
app.get("/page/video", (req, res) => res.render("video"));

app.use(authRouter);
app.use(videoRouter);
app.use(inquiryRouter);

// middleware
app.use(notFoundRout);
app.use(errorHandlerMiddleware);

module.exports = app;
