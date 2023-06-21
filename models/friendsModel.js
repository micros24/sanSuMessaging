'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FriendsModel.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email1: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false
    },
    email2: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false
    }
  }, {
    sequelize,
    modelName: 'FriendsModel',
    tableName: 'friends'
  });
  return FriendsModel;
};