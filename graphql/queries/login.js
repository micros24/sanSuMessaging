const { JWT_SECRET } = require('../../config/env.json');
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
            let user = await UserModel.findOne({ where: {email}});

            // Check if account exists
            if(user === null) {
                errors.email = 'Email is not registered';
                throw errors;
            // Check if password is correct
            } else if(!await bcrypt.compare(password, user.dataValues.password)) {
                errors.password = "Credentials does not match";
                throw errors;
            }

            // Token generation
            user.token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 60 * 60 }); 

            return user;
        } catch (_) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: errors }
              });
        }
};