const registerProvider = require('./mutations/register');
const sendMessageProvider = require('./mutations/sendMessage');
const sendFriendRequestProvider = require("./mutations/sendFriendRequest");
const deleteFriendRequestProvider = require("./mutations/deleteFriendRequest");
const addFriendProvider = require("./mutations/addFriend");
const loginProvider = require('./queries/login');
const getUsersProvider = require('./queries/getUsers');
const getUsersTempProvider = require('./queries/getUsersTemp');
const getMessagesProvider = require('./queries/getMessages');
const getFriendsProvider = require('./queries/getFriends');
const getFriendRequestsProvider = require('./queries/getFriendRequests');
const { UserModel } = require('../models');
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

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
        getFriendRequests: (_, __, { user }) => {
            return getFriendRequestsProvider(user);
        },
        foo() {
            return 'foo';
        }
  },
  Mutation: {
    register: (_, formData) => {
        return registerProvider(UserModel, formData);
    },
    addFriend: (_, { sender }, { user }) => {
        return addFriendProvider(sender, user);
    },
    sendMessage: (_, { to, content } , { user }) => {
        return sendMessageProvider(UserModel, { to, content }, user, pubSub);
    },
    sendFriendRequest: (_, { recipient }, { user }) => {
        return sendFriendRequestProvider(UserModel, recipient, user);
    },
    deleteFriendRequest: (_, { sender }, { user }) => {
        return deleteFriendRequestProvider(sender, user);
    }
  },
  Subscription: {
    newMessage: {
        subscribe: () => pubSub.asyncIterator(['NEW_MESSAGE'])
    } 
  }
}