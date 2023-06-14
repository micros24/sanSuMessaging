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
    type Query {
        getUsers: [UserModel]!
        login(email: String!, password: String!): UserModel!
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
    }
`;
