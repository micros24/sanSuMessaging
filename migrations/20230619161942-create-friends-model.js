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
      email1: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false
      },
      email2: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false
      },
      friendsSince: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('friends');
  }
};