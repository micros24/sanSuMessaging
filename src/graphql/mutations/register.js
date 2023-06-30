const { GraphQLError } = require("graphql");
const bcrypt = require("bcryptjs");
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = async (UserModel, formData) => {
  let {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    profilePicture,
  } = formData;
  let errors = {};

  try {
    // Validate data
    if (email.trim() === "") errors.email = "Email cannot be empty";
    if (password.trim() === "") errors.password = "Password cannot be empty";
    if (confirmPassword.trim() === "")
      errors.confirmPassword = "Confirm password cannot be empty";
    if (firstName.trim() === "")
      errors.firstName = "First Name cannot be empty";
    if (lastName.trim() === "") errors.lastName = "Last Name cannot be empty";

    // Check if email exists and if its valid
    if (!validateEmail(email)) errors.email = "Email must be a valid address"; // Added for mariaDB compatibility. Not needed when using MySQL
    const userByEmail = await UserModel.findOne({ where: { email } });
    if (userByEmail) errors.email = "Email is already taken";

    // Check if passwords match
    if (password !== confirmPassword)
      errors.password = "Passwords does not match";

    // Check if any errors occured
    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    // Hash password
    password = await bcrypt.hashSync(password, 8);

    // Creatue user
    const user = await UserModel.create({
      email,
      password,
      firstName,
      lastName,
      profilePicture,
    });

    return user;
  } catch (_) {
    throw new GraphQLError("InputValidationViolation", {
      extensions: {
        errors: errors,
      },
    });
  }
};
