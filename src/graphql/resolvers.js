const registerProvider = require('./mutations/register');
const sendMessageProvider = require('./mutations/sendMessage');
const sendFriendRequestProvider = require("./mutations/sendFriendRequest");
const deleteFriendRequestProvider = require("./mutations/deleteFriendRequest");
const addFriendProvider = require("./mutations/addFriend");
const loginProvider = require('./queries/login');
const getUsersProvider = require('./queries/getUsers');
const getMessagesProvider = require('./queries/getMessages');
const getFriendsProvider = require('./queries/getFriends');
const getFriendRequestsProvider = require('./queries/getFriendRequests');

const { UserModel } = require('../models');
const { withFilter } = require("graphql-subscriptions")
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

module.exports = {
    MessageModel: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
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
        return sendFriendRequestProvider(UserModel, recipient, user, pubSub);
    },
    deleteFriendRequest: (_, { sender }, { user }) => {
        return deleteFriendRequestProvider(sender, user);
    }
  },
  Subscription: {
    newMessage: {
        subscribe: () => pubSub.asyncIterator('NEW_MESSAGE')
    },
    newFriendRequest: {
        subscribe: withFilter(
            //first parameter
            (_, __, { user }) => {
                if (!user) throw new GraphQlError('Unauthenticated');
                return pubSub.asyncIterator(['NEW_FRIEND_REQUEST']);
            },
            //second parameter
            ({ newFriendRequest }, { recipient }) => {
                if (newFriendRequest.recipient === recipient) {
                    return true;
                }
            
            return false;
            }
        )
    }
  }
}
