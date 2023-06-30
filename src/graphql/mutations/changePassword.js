const { GraphQLError } = require("graphql");
const bcrypt = require("bcryptjs");

module.exports = async (UserModel, passwords, user) => {
  const { oldPassword, newPassword, confirmPassword } = passwords;
  let errors = {};

  try {
    // Validation
    if (!user) throw new GraphQLError("Unauthenticated");

    // Input validation
    if (oldPassword.trim() === "")
      errors.oldPassword = "Old Password cannot be empty!";
    if (newPassword.trim() === "")
      errors.newPassword = "New Password cannot be empty!";
    if (confirmPassword.trim() === "")
      errors.confirmPassword = "Confirm password cannot be empty!";

    // Get current user
    const localUser = await UserModel.findOne({
      where: {
        email: user.email,
      },
    });

    // Validate if current password is correct
    let result = await bcrypt.compareSync(
      oldPassword,
      localUser.dataValues.password
    );
    if (!result) errors.oldPassword = "Credentials does not match!";

    // Check if passwords match
    if (newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords does not match!";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    // Hash password
    newPassword = await bcrypt.hashSync(newPassword, 8);

    localUser.set({
      password: newPassword,
    });

    await localUser.save();
    return localUser;
  } catch (error) {
    throw new GraphQLError("InputValidation", {
      extensions: {
        errors: errors,
      },
    });
  }
};
