module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      date: {
        type: DataTypes.DATE,
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
      timestamps: true,
    }
  );
  return Transaction;
};
