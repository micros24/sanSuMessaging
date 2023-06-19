const registerProvider = require('./mutations/register');
const sendMessageProvider = require('./mutations/sendMessage');
const loginProvider = require('./queries/login');
const getUsersProvider = require('./queries/getUsers');
const getMessagesProvider = require('./queries/getMessages');
const getFriendsProvider = require('./queries/getFriends');
const { UserModel } = require('../models');

module.exports = {
    MessageModel: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
        getUsers: (_, __, { user }) => {
            return getUsersProvider(UserModel, user);
        },
        getFriends: (_, __, { user }) => {
            return getFriendsProvider(UserModel, user);
        },
        getMessages: (_, { from }, { user }) => {
            return getMessagesProvider(UserModel, from, user);
        },
        login: (_, args) => {
            return loginProvider(UserModel, args);
        }
  },
  Mutation: {
    register: (_, args) => {
        return registerProvider(UserModel, args);
    },
    sendMessage: (_, { to, content } , user) => {
        return sendMessageProvider(UserModel, { to, content }, user);
    }
  }
}