const { GraphQLError } = require('graphql');

module.exports = async (UserModel , newDetails, user, pubSub) => {
    let {firstName, lastName, profilePicture} = newDetails;

    try {
        // Validation
        if(!user) throw new GraphQLError('Unauthenticated');

        const newDetails = UserModel.findOne({
            where: {
                email: user.email
            }
        });
        newDetails.firstName = firstName;
        newDetails.lastName = lastName;
        newDetails.profilePicture = profilePicture;

        // pubSub.publish("NEW_FRIEND", { newFriend: friend, loggedInUser: user.email });

        return newDetails;
    } catch (error) {
        throw error;
    }
};