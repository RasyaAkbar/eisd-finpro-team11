'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Streak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Streak.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Streak.init({
    currentStreak: DataTypes.INTEGER,
    longestStreak: DataTypes.INTEGER,
    lastActive: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Streak',
  });
  return Streak;
};