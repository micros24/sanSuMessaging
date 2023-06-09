const registerProvider = require("./mutations/register");
const sendMessageProvider = require("./mutations/sendMessage");
const sendFriendRequestProvider = require("./mutations/sendFriendRequest");
const deleteFriendRequestProvider = require("./mutations/deleteFriendRequest");
const addFriendProvider = require("./mutations/addFriend");
const loginProvider = require("./queries/login");
const getUsersProvider = require("./queries/getUsers");
const getMessagesProvider = require("./queries/getMessages");
const getFriendsProvider = require("./queries/getFriends");
const getFriendRequestsProvider = require("./queries/getFriendRequests");
const editUserDetailsProvider = require("./mutations/editUserDetails");
const changePasswordProvider = require("./mutations/changePassword");
const uploadFileProvider = require("./mutations/fileUpload");

const { UserModel } = require("../models");
const { withFilter } = require("graphql-subscriptions");
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
    },
  },
  Mutation: {
    register: (_, formData) => {
      return registerProvider(UserModel, formData);
    },
    addFriend: (_, { sender }, { user }) => {
      return addFriendProvider(UserModel, sender, user, pubSub);
    },
    sendMessage: (_, { to, content }, { user }) => {
      return sendMessageProvider(UserModel, { to, content }, user, pubSub);
    },
    sendFriendRequest: (_, { recipient }, { user }) => {
      return sendFriendRequestProvider(UserModel, recipient, user, pubSub);
    },
    deleteFriendRequest: (_, { sender }, { user }) => {
      return deleteFriendRequestProvider(sender, user);
    },
    editUserDetails: (_, newDetails, { user }) => {
      return editUserDetailsProvider(UserModel, newDetails, user);
    },
    changePassword: (_, passwords, { user }) => {
      return changePasswordProvider(UserModel, passwords, user);
    },
    uploadFile: (_, { file }, { user }) => {
      return uploadFileProvider(file, user);
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        // first parameter
        (_, __, { user }) => {
          if (!user) throw new GraphQlError("Unauthenticated");
          return pubSub.asyncIterator("NEW_MESSAGE");
        },
        // second parameter
        // newMessage is from API response
        // recipient is parameter for API request
        ({ newMessage }, { recipient, from }) => {
          if (
            (newMessage.to === recipient && newMessage.from === from) ||
            (newMessage.to === from && newMessage.from === recipient)
          ) {
            return true;
          }
          return false;
        }
      ),
    },
    newFriendRequest: {
      subscribe: withFilter(
        //first parameter
        (_, __, { user }) => {
          if (!user) throw new GraphQlError("Unauthenticated");
          return pubSub.asyncIterator("NEW_FRIEND_REQUEST");
        },
        //second parameter
        ({ newFriendRequest }, { recipient }) => {
          if (newFriendRequest.recipient === recipient) {
            return true;
          }
          return false;
        }
      ),
    },
    newFriend: {
      subscribe: withFilter(
        //first parameter
        (_, __, { user }) => {
          if (!user) throw new GraphQlError("Unauthenticated");
          return pubSub.asyncIterator("NEW_FRIEND");
        },
        //second parameter
        ({ _, loggedInUser }, { recipient }) => {
          if (loggedInUser === recipient) {
            return true;
          }
          return false;
        }
      ),
    },
    newMessageSideBarReorganizer: {
      subscribe: withFilter(
        //first parameter
        (_, __, { user }) => {
          if (!user) throw new GraphQlError("Unauthenticated");
          return pubSub.asyncIterator("REORGANIZE_FRIENDS");
        },
        //second parameter
        ({ _, newMessageSideBarReorganizer }, { recipient }) => {
          if (newMessageSideBarReorganizer.to === recipient) {
            return true;
          }
          return false;
        }
      ),
    },
  },
};
