const { GraphQLError } = require("graphql");
const { Op } = require("sequelize");
const getSentFriendRequests = require("./getSentFriendRequests");
const getFriendRequests = require("./getFriendRequests");
const getFriends = require("./getFriends");
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

module.exports = async (UserModel, name, user) => {
  try {
    // Validation
    if (!user) throw new GraphQLError("Unauthenticated");
    if (name.trim() === "") {
      throw "The name cannot be empty!";
    }

    let users = [];
    if (validateEmail(name)) {
      // Input is an email address
      users = await UserModel.findAll({
        where: {
          email: name,
        },
      });
    } else {
      // Input is a name
      let names = [];
      if (hasWhiteSpace(name)) {
        // Input is a first name and last name
        // Separate each name into an array
        var stringArray = name.split(/(\s+)/);
        for (var i = 0; i < stringArray.length; i++) {
          // If array value is not a whitespace, push into names array
          if (stringArray[i] !== " ") names.push(stringArray[i]);
        }
      } else {
        // Input is a string with no spaces
        // Check if its' a first name
        names.push(name);

        users = await UserModel.findAll({
          where: {
            email: { [Op.ne]: user.email },
            firstName: { [Op.in]: names },
          },
          order: [["createdAt", "DESC"]],
        });

        // Check if its' a last name
        if (!users[0]) {
          users = await UserModel.findAll({
            where: {
              email: { [Op.ne]: user.email },
              lastName: { [Op.in]: names },
            },
            order: [["createdAt", "DESC"]],
          });
        }
      }
    }

    // User is not registered
    if (!users[0]) throw "A person with that name/email is not registered.";

    // remove all of my friends from the lsit (search for a friend)
    const friends = await getFriends(UserModel, user);
    let tempUsers;
    // friend == UsersModel
    users.forEach((person) => {
      friends.forEach((friend, index) => {
        if (friend.email === person.email) {
          delete users[index];
        }
      });
    });

    // Get all friend requests I have sent
    const sentFriendRequests = await getSentFriendRequests(user);
    // Get all friend requests to me
    let friendRequests = await getFriendRequests(user);
    let friendRequestSentChecker = [];
    let match;

    const pushIntoFriendRequestSentChecker = (person, match) =>
      friendRequestSentChecker.push({
        email: person.email,
        firstName: person.firstName,
        lastName: person.lastName,
        profilePicture: person.profilePicture,
        match: match,
      });

    // users = the list of person with the name i am searching,
    // filtered to remove my friends
    // sentFriendRequests = all friend requests that I have sent
    users.forEach((person) => {
      if (sentFriendRequests[0]) {
        sentFriendRequests.forEach((sentFriendRequest) => {
          if (person.email === sentFriendRequest.recipient) {
            match = "recipient";
            pushIntoFriendRequestSentChecker(person, match);
          } else {
            match = "false";
            pushIntoFriendRequestSentChecker(person, match);
          }
        });
      } else {
        match = "false";
        pushIntoFriendRequestSentChecker(person, match);
      }
    });

    friendRequestSentChecker.forEach((person) => {
      if (friendRequests[0]) {
        friendRequests.forEach((friendRequest) => {
          if (person.email === friendRequest.sender) {
            person.match = "sender";
          }
        });
      }
    });

    return friendRequestSentChecker;
  } catch (err) {
    if (typeof err === "string") {
      throw new GraphQLError("InputValidationViolation", {
        extensions: {
          errors: err,
        },
      });
    } else throw err;
  }
};
