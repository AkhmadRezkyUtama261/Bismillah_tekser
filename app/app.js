const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use("/", routes);

app.listen(3000, () => {
  console.log("App running on port 3000");
});