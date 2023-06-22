const { MessageModel } = require('../../models');
const { GraphQLError } = require ('graphql');
const { Op } = require("sequelize");

module.exports = async (UserModel, from, user) => {
    try{
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');
        const sender = await UserModel.findOne({where: {email: from}});
        if(!sender) throw new GraphQLError('Sender is not registered');

        const emails = [user.email, sender.email];
        // Query db of all messages with emails to and from in emails array
        const messages = await MessageModel.findAll({
            where: { 
                from: { [Op.in]: emails },
                to: { [Op.in]: emails }
             },
             order: [['createdAt', 'DESC']]
        });

        return messages;
    } catch(err){
        throw err;
    }
};