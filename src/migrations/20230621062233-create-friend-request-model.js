"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("friendRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sender: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        references: { model: "users", key: "email" },
      },
      recipient: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        references: { model: "users", key: "email" },
      },
      senderFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderLastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderProfilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("friendRequests");
  },
};
