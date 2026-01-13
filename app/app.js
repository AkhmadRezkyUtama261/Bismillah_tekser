const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mainRoutes = require("./routes");

const app = express();
const PORT = 3000;

// ⬇️ INI KUNCI NYAWA
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", mainRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
