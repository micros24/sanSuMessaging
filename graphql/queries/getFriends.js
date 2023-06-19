const { GraphQLError } = require ('graphql');
const { Op } = require("sequelize");

module.exports = async (UserModel, user) => {
    if(!user) throw new GraphQLError('Unauthenticated');

        try {
            // Query database of all users
            const users = await UserModel.findAll({
                // Do not return user's own account
                where: { email: { [Op.ne]: user.email }}
            });

            return users;
        } catch (err) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: err }
              });
        };
};