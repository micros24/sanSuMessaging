const tokenGenerationProvider = require('../../utils/tokenGeneration');
const { GraphQLError } = require('graphql');

module.exports = async (UserModel , newDetails, user) => {
    let {firstName, lastName, profilePicture} = newDetails;
    let errors = {};

    try {
        // Input validation
        if(firstName.trim() === '') errors.firstName = 'First name cannot be empty!';
        if(lastName.trim() === '') errors.lastName = 'Last name cannot be empty!';

        if(Object.keys(errors).length > 0) {
            throw errors;
        }

        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');

        const localUser = await UserModel.findOne({
            where: {
                email: user.email
            }
        });

        localUser.set({
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            profilePicture: profilePicture
        })

        let tokenData = localUser.dataValues;
        await localUser.save();
        tokenGenerationProvider(localUser, tokenData);
        return localUser;
    } catch (error) {
        throw new GraphQLError('InputValidation', {
            extensions: { 
                errors: errors }
            });
    }
};