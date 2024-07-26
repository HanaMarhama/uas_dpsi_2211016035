module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false, // Add this if date must be provided
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
      tableName: "Transactions", // Optional: Specify the table name explicitly
    }
  );

  return Transaction;
};
