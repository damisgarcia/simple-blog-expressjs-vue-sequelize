'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('member', 'writer', 'admin')
  }, { timestamps: true });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};