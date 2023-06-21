const registerProvider = require('./mutations/register');
const sendMessageProvider = require('./mutations/sendMessage');
const sendFriendRequestProvider = require("./mutations/sendFriendRequest")
const loginProvider = require('./queries/login');
const getUsersProvider = require('./queries/getUsers');
const getUsersTempProvider = require('./queries/getUsersTemp');
const getMessagesProvider = require('./queries/getMessages');
const getFriendsProvider = require('./queries/getFriends');
// const getRequestsProvider = require('./queries/getRequests');
const { UserModel } = require('../models');

module.exports = {
    MessageModel: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
        // TODO: TEMP ONLY
        getUsersTemp: (_, __, { user }) => {
            return getUsersTempProvider(UserModel, user);
        },
        getUsers: (_, { name }, { user }) => {
            return getUsersProvider(UserModel, name, user);
        },
        getFriends: (_, __, { user }) => {
            return getFriendsProvider(UserModel, user);
        },
        getMessages: (_, { from }, { user }) => {
            return getMessagesProvider(UserModel, from, user);
        },
        login: (_, args) => {
            return loginProvider(UserModel, args);
        },
        // getRequests: (_, __, { user }) => {
        //     return getRequestsProvider(user);
        // }
  },
  Mutation: {
    register: (_, formData) => {
        return registerProvider(UserModel, formData);
    },
    sendMessage: (_, { to, content } , user) => {
        return sendMessageProvider(UserModel, { to, content }, user);
    },
    sendFriendRequest: (_, formData, user) => {
        return sendFriendRequestProvider(UserModel, formData, user);
    }
  }
}