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
          len: [1, 255], // Limit length of the username
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255], // Ensure password length is between 6 and 255 characters
        },
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      tableName: "Users", // Explicitly set table name
      underscored: true, // Use snake_case for column names
    }
  );

  // Hook to hash password before saving to the database
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
