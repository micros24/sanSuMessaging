const { GraphQLError } = require('graphql');
const { FriendRequestModel } = require('../../models');

module.exports = async (UserModel, formData, user) => {
    let { recipient, sender } = formData;
    sender = user.user.email;

    try {
        // TODO: Add validation not to send into same user
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');
        if(recipient.trim() === '') throw new GraphQLError('Recipient cannot be empty');
        const sentTo = await UserModel.findOne({ where: { email: recipient }});
        if(!sentTo) throw new GraphQLError('Recipient is not registered');

        const friendRequest = await FriendRequestModel.create({
            sender: sender,
            recipient: recipient
        });

        return friendRequest;
    } catch (error) {
        throw error;
    }
};