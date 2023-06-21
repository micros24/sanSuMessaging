module.exports = 
    `#graphql
    type UserModel {
        email: String!
        firstName: String!
        lastName: String!
        profilePicture: String
        token: String
    }
    type MessageModel {
        uuid: String!
        to: String!
        from: String!
        content: String!
        createdAt: String!
    }
    type FriendsModel {
        uuid: String!
        email1: String!
        email2: String!
    }
    type FriendRequestModel {
        uuid: String!
        sender: String!
        recipient: String!
    }
    type Query {
        getUsersTemp: [UserModel]! # TODO: TEMP ONLY
        getUsers(name: String!): [UserModel]!
        login(email: String!, password: String!): UserModel!
        getMessages(from: String!): [MessageModel]!
        getFriends: [FriendsModel]!
        getFriendRequests: [FriendRequestModel]!
    }
    type Mutation {
        register(
            email: String!
            password: String! 
            confirmPassword: String!
            firstName: String!
            lastName: String!
            profilePicture: String
        ): UserModel!
        sendMessage(
            to: String!
            content: String!
        ): MessageModel!
        sendFriendRequest(
            sender: String!
            recipient: String!
        ): FriendRequestModel!
    }
`;
