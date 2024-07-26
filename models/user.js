const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255], // Optional: limit length
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255], // Optional: ensure password is of minimum length
        },
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt columns
      tableName: "Users", // Optional: specify table name
      underscored: true, // Optional: use snake_case for columns
    }
  );

  // Hook to hash password before saving to database
  User.beforeCreate(async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // Method to compare password for authentication
  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
