const { JWT_SECRET } = require('../../config/config.json');
const { GraphQLError } = require ('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

module.exports = async (UserModel, args) => {
    const { email, password } = args;
        let errors = {};

        try {
            // Input validation
            if(email.trim() === '') errors.email = 'Email cannot be empty';
            if(password === '') errors.password = 'Password cannot be empty';
            
            if(Object.keys(errors).length > 0) {
                throw errors;
            }

            // Get user data
            const user = await UserModel.findOne({ where: {email}});

            // Check if account exists
            if(user === null) {
                errors.email = 'Email is not registered';
                throw errors;
            // Check if password is correct
            } else if(!await bcrypt.compare(password, user.dataValues.password)) {
                errors.password = "Credentials does not match";
                throw errors;
            }

            let tokenData = {
                email: user.dataValues.email,
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                profilePicture: user.dataValues.profilePicture
            }

            // Token generation
            user.token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: 60 * 60 }); 

            return user;
        } catch (_) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: errors }
              });
        }
};