const { GraphQLError } = require("graphql");
const { FriendsModel } = require("../../models");

module.exports = async (UserModel, sender, user, pubSub) => {
  try {
    // Validation
    if (!user) throw new GraphQLError("Unauthenticated");

    const addFriend = await FriendsModel.create({
      sender: sender,
      recipient: user.email,
    });

    const friend = await UserModel.findOne({
      where: {
        email: sender,
      },
    });

    pubSub.publish("NEW_FRIEND", {
      newFriend: friend,
      loggedInUser: user.email,
    });

    return addFriend;
  } catch (error) {
    throw error;
  }
};
