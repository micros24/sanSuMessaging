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
        sender: String!
        recipient: String!
    }
    type FriendRequestModel {
        uuid: String!
        sender: String!
        recipient: String!
        senderFirstName: String!
        senderLastName: String!
        senderProfilePicture: String
    }
    type FriendRequestSentChecker {
        email: String!
        firstName: String!
        lastName: String!
        profilePicture: String
        match: Boolean!
    }
    type Query {
        getUsers(name: String!): [FriendRequestSentChecker]!
        login(email: String!, password: String!): UserModel!
        getMessages(from: String!): [MessageModel]!
        getFriends: [UserModel]!
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
        addFriend(
            sender: String!
        ): FriendsModel
        sendMessage(
            to: String!
            content: String!
        ): MessageModel!
        sendFriendRequest(
            sender: String
            recipient: String!
            senderFirstName: String
            senderLastName: String
            senderProfilePicture: String
        ): FriendRequestModel!
        deleteFriendRequest(
            sender: String!
        ): FriendRequestModel
        editUserDetails(
            firstName: String!
            lastName: String!
            profilePicture: String
        ): UserModel!
    }
    type Subscription {
        newMessage(
            recipient: String!
        ): MessageModel!
        newFriendRequest(
            recipient: String!
        ): FriendRequestModel!
        newFriend(
            recipient: String!
        ): UserModel!
    }
`;
