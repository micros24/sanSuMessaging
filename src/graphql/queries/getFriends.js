const { GraphQLError } = require ('graphql');
const { FriendsModel } = require('../../../src/models');
const { Op } = require("sequelize");

module.exports = async (UserModel, user) => {
    if(!user) throw new GraphQLError('Unauthenticated');

        try {
            const friendsEmails = await FriendsModel.findAll({
                where: {
                    [Op.or]: [{ sender: user.email }, { recipient: user.email }]
                }
            });

            let emails = [];
            friendsEmails.forEach(email => {
                if(email.sender != user.email) {
                    emails.push(email.sender);
                } else if (email.recipient != user.email) {
                    emails.push(email.recipient);
            }});

            // Query database of all users
            const friends = await UserModel.findAll({
                where: {
                    email: { [Op.in]: emails }
                }
            });

            // let index = friends.fiendIndex(() => ({email: user.email}));
            // delete friends[index];

            return friends;
        } catch (err) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: err }
              });
        };
};