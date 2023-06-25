const { GraphQLError } = require ('graphql');
const { FriendRequestModel } = require("../../models");

module.exports = async (user) => {
    if(!user) throw new GraphQLError('Unauthenticated');

        try {
            // Get all friend requests that current user has sent
            const friendRequests = await FriendRequestModel.findAll({
                where: { sender: user.email }
            });

            return friendRequests;
        } catch (err) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: err }
              });
        };
};