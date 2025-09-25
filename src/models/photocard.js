'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.PhotoCard.belongsTo(models.Module, { foreignKey: 'moduleId', as: 'module' });
    }
  }
  PhotoCard.init({
    imageUrl: DataTypes.STRING,
    caption: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhotoCard',
  });
  return PhotoCard;
};