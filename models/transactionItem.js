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
      timestamps: true,
    }
  );
  return TransactionItem;
};
