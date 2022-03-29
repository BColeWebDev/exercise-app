'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Training_Days', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      description: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      regimentId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Regiments'
          },
          key: 'id'
        },
        allowNull: true
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
    await queryInterface.dropTable('Training_Days');
  }
};