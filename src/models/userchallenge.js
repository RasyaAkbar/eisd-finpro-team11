'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChallenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserChallenge.init({
    userId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserChallenge',
  });
  return UserChallenge;
};