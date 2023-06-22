'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('friends', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      sender: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        references: { model: 'users', key: 'email' }
      },
      recipient: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        references: { model: 'users', key: 'email' }
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
    await queryInterface.dropTable('friends');
  }
};