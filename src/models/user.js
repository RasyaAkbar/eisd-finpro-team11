'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasOne(models.Streak, { foreignKey: 'userId', as: 'streak' });
      models.User.hasMany(models.Badge, { foreignKey: 'userId', as: 'badges' });
      models.User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};