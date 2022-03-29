'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training_Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Training_Day.belongsTo(models.Regiment)
      models.Training_Day.hasMany(models.Exercise)



    }
  }
  Training_Day.init({
    description: DataTypes.STRING,
    day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Training_Day',
  });
  return Training_Day;
};