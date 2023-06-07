'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        notEmpty: true,
        // Validate does not work in mariaDB, adding it in case of MySQL implementation
        validate: {
          isEmail: {
            args: true,
            msg: 'Must be a valid email'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      profilePicture: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('users');
  }
};
