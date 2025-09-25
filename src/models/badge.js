'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Badge.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Badge.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    iconUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Badge',
  });
  return Badge;
};