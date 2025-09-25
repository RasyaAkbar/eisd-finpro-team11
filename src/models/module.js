'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Module.hasMany(models.Comment, { foreignKey: 'moduleId', as: 'comments' });// Add this line to define the one-to-many relationship with Comment
      models.Module.hasMany(models.PhotoCard, { foreignKey: 'moduleId', as: 'photoCards' });
      models.Module.hasMany(models.Challenge, { foreignKey: 'moduleId', as: 'challenges' });
    }
  }
  Module.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    coverUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};