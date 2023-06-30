"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FriendRequestModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FriendRequestModel.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sender: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
      },
      recipient: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
      },
      senderFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderProfilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FriendRequestModel",
      tableName: "friendRequests",
    }
  );
  return FriendRequestModel;
};
