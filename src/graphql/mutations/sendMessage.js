const { GraphQLError } = require('graphql');
const { MessageModel } = require('../../models');
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

module.exports = async (UserModel, { to, content }, user) => {
    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');
        if(to.trim() === '') throw new GraphQLError('Recipient cannot be empty');
        if(content.trim() === '') throw new GraphQLError('Message cannot be empty');
        const recipient = await UserModel.findOne({ where: { email: to }});
        if(!recipient) throw new GraphQLError('Recipient is not registered');
        else if(recipient.email === user.user.email) throw new GraphQLError('You cannot message yourself');

        const message = await MessageModel.create({
            from: user.email,
            to,
            content
        });

        pubSub.publish('NEW_MESSAGE', { newMessage: message });

        return message;
    } catch (error) {
        throw error;
    }
};