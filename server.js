const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

// mandatory middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//import a api routes
const post_route = require("./routes/blogPostRoute");
//middleware for routing

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
