const { GraphQLError } = require('graphql');

module.exports = async (UserModel , newDetails, user, pubSub) => {
    let {firstName, lastName, profilePicture} = newDetails;

    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');

        const newDetails = await UserModel.findOne({
            where: {
                email: user.email
            }
        });

        newDetails.set({
            firstName: firstName,
            lastName: lastName,
            profilePicture: profilePicture
        })

        await newDetails.save();

        return newDetails;
    } catch (error) {
        throw error;
    }
};