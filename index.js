const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
const app = express();

//Body capture

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//BD conection

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.msykfcx.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, options)
  .then(() => console.log("Connected Database"))
  .catch((e) => console.log(e));

//Import routes
const authRoutes = require("./routes/auth");
const dashboadRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

//Route middlewares

app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboadRoutes);

app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "Is working!",
  });
});

//Server start
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server run in: ${PORT}`);
});
