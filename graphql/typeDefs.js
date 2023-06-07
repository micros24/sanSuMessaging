module.exports = 
    `#graphql
    type UserModel {
        email: String!
        firstName: String!
        lastName: String!
        profilePicture: String
        token: String
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
            profilePicture: String!
        ): UserModel!
    }
`;
