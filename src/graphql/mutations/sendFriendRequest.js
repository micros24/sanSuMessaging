const { GraphQLError } = require('graphql');
const { FriendRequestModel } = require('../../models');

module.exports = async (UserModel, recipient, user) => {
    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');
        if(recipient.trim() === '') throw new GraphQLError('Recipient cannot be empty');
        const sentTo = await UserModel.findOne({ where: { email: recipient }});
        if(!sentTo) throw new GraphQLError('Recipient is not registered');

        const friendRequest = await FriendRequestModel.create({
            sender: user.email,
            recipient: recipient,
            senderFirstName: user.firstName,
            senderLastName: user.lastName,
            senderProfilePicture: user.profilePicture
        });

        return friendRequest;
    } catch (error) {
        throw error;
    }
};