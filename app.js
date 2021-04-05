const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

//connect to mongo DB
const dbUIR =
  "mongodb+srv://AdamowiczPiotr:4y8uTDJLCTr7PRP@cluster0.jxr7f.mongodb.net/blogsData?retryWrites=true&w=majority";

mongoose
  .connect(dbUIR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//register view engine

//.set first argument is the option we are Setting
app.set("view engine", "ejs");

//you can set directory for views like so: app.set('views', 'path-to-views-directory')

//middleware & static files

app.use(express.static("styles"));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

//blog routes

app.use("/blogs", blogRoutes);

//error - must by last because .use fires every time

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Blog not found",
  });
});
