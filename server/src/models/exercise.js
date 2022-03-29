'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Exercise.belongsTo(models.Training_Day)

    }
  }
  Exercise.init({
    name: DataTypes.STRING,
    equipment: DataTypes.STRING,
    muscle_target: DataTypes.STRING,
    bodyPart: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};