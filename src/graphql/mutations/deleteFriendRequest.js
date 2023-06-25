const { GraphQLError } = require('graphql');
const { FriendRequestModel } = require('../../models');

module.exports = async (sender, user) => {
    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');

        const friendRequest = await FriendRequestModel.destroy({
            // returns 1 if success
            where: {
                sender: sender,
                recipient: user.email
            }
        });
        if(friendRequest === 1) {
            return {sender: sender}
        } else throw new GraphQLError;
        
    } catch (error) {
        throw error;
    }
};