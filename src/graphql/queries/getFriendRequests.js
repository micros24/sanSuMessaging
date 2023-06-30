const { GraphQLError } = require("graphql");
const { FriendRequestModel } = require("../../models");

module.exports = async (user) => {
  if (!user) throw new GraphQLError("Unauthenticated");

  try {
    // Query database of all users
    const friendRequests = await FriendRequestModel.findAll({
      where: { recipient: user.email },
    });

    return friendRequests;
  } catch (err) {
    throw new GraphQLError("CredentialsViolation", {
      extensions: {
        errors: err,
      },
    });
  }
};
