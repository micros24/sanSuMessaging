const registerProvider = require('./mutations/register');
const sendMessageProvider = require('./mutations/sendMessage');
const loginProvider = require('./queries/login');
const getUsersProvider = require('./queries/getUsers');
const { UserModel } = require('../models');

module.exports = {
    Query: {
    getUsers: (_, __, { user }) => {
        console.log(user);
        return getUsersProvider(UserModel, user);
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