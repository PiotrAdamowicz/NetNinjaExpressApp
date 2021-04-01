const express = require("express");

const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  //second argument sets root directory to the current dir cause .sendFile uses absolute path by default
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//error - must by last because .use fires every time

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
