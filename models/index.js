const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");
const sequelize = new Sequelize(config.development);

const db = {};

// Assign Sequelize and sequelize instance to db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);
db.Transaction = require("./transaction")(sequelize, DataTypes);
db.TransactionItem = require("./transactionItem")(sequelize, DataTypes);

// Define relationships
db.Transaction.belongsToMany(db.Product, { through: db.TransactionItem });
db.Product.belongsToMany(db.Transaction, { through: db.TransactionItem });

// Optional: Define relationships for User model if needed
// Example: db.User.hasMany(db.Transaction);
// db.Transaction.belongsTo(db.User);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables if needed
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncDatabase();

module.exports = db;
