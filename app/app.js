require("dotenv").config;
const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use("/", routes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});
