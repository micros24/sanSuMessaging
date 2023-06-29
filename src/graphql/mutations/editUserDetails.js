const { profile } = require('console');
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

        // newDetails.firstName = firstName;
        // newDetails.lastName = lastName;
        // newDetails.profilePicture = profilePicture;

        await newDetails.save();

        // pubSub.publish("NEW_FRIEND", { newFriend: friend, loggedInUser: user.email });

        return newDetails;
    } catch (error) {
        throw error;
    }
};