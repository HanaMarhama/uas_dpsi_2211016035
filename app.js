const express = require("express");
const app = express();
const db = require("./models");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const transactionRouter = require("./routes/transaction");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/transactions", transactionRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
