'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING
      },
      equipment: {
        type: Sequelize.STRING
      },
      muscle_target: {
        type: Sequelize.STRING
      },
      bodyPart: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      TrainingDayId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'Training_Days'
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exercises');
  }
};