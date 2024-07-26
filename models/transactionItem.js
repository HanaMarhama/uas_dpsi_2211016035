module.exports = (sequelize, DataTypes) => {
  const TransactionItem = sequelize.define(
    "TransactionItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
      tableName: "TransactionItems", // Optional: Specify the table name explicitly
    }
  );

  return TransactionItem;
};
