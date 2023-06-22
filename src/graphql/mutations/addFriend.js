const { GraphQLError } = require('graphql');
const { FriendsModel } = require('../../models');

module.exports = async (sender, user) => {
    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');

        const addFriend = await FriendsModel.create({
            sender: sender,
            recipient: user.email
        });

        return addFriend;
    } catch (error) {
        throw error;
    }
};