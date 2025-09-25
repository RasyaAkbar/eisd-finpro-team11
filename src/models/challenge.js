'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        models.Challenge.belongsTo(models.Module, { foreignKey: 'moduleId', as: 'module' });
    }
  }
  Challenge.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};