const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;

// mandatory middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);


app.use(cookieParser());

//import a api routes

// const admin_route = require("./routes/adminRoute");
const post_route = require("./routes/blogPostRoute");
//middleware for routing

// app.use("/api/user", admin_route);
app.use("/api/blog-post",post_route);
// error handeling middleware

app.use((error, req, res, next) => {
  res
    .status(500)
    .send(`Internal server error : ${error} `);
  next();
});

// server start

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(` Server is running ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
