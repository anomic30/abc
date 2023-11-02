const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const router = require("./routes/index.js");
const connectDB = require("./database/connection.js");

const app = express();
const port = process.env.PORT || 8082;

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
})

app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`📦 Server is running on port ${port}.`);
  });
});
