'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regiment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Regiment.belongsTo(models.User)
      models.Regiment.hasMany(models.Training_Day)
      models.Regiment.hasMany(models.Goal)

    }
  }
  Regiment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Regiment',
  });
  return Regiment;
};