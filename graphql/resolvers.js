const bcrypt = require("bcryptjs");
const { UserModel } = require('../models');
const { GraphQLError, validate } = require ('graphql');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { JWT_SECRET } = require('../config/env.json');
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = {
    Query: {
    getUsers: async (_, __, context) => {
        let user;

        try {
            // Token extraction
            if(context.req && context.req.headers.authorization) {
            const token = context.req.headers.authorization.split('Bearer ')[1];

            // Verify token
            jwt.verify(token, JWT_SECRET, function(err, decoded) {
                if(err) {
                    throw new GraphQLError('Unauthenticated');
                }
                user = decoded;
              });
            }

            // Query database of all users
            const users = await UserModel.findAll({
                // Do not return user's own account
                where: { email: { [Op.ne]: user.email }}
            });

            return users;
        } catch (err) {
            throw new GraphQLError('CredentialsViolation', {
                extensions: { 
                    errors: err }
              });
        };
    },
    login: async (_, args) => {
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
    }
  },
  Mutation: {
    register: async (_, args) => {
        let {email, password, confirmPassword, firstName, lastName, profilePicture} = args;
        let errors = {};

        try{
            // Validate data
            if(email.trim() === '') errors.email = 'Email cannot be empty';
            if(password.trim() === '') errors.password = 'Password cannot be empty';
            if(confirmPassword.trim() === '') errors.confirmPassword = 'Confirm password cannot be empty';
            if(firstName.trim() === '') errors.firstName = 'First Name cannot be empty';
            if(lastName.trim() === '') errors.lastName = 'Last Name cannot be empty';

            // Check if email exists and if its valid
            if(!validateEmail(email)) errors.email = 'Email must be a valid address'; // Added for mariaDB compatibility. Not needed when using MySQL
            const userByEmail = await UserModel.findOne({ where: {email}});
            if(userByEmail) errors.email = 'Email is already taken';

            // Check if passwords match
            if(password !== confirmPassword) errors.password = 'Passwords does not match';

            // Check if any errors occured
            if(Object.keys(errors).length > 0) {
                throw errors;
            }

            // Hash password
            password = await bcrypt.hashSync(password, 8);

            // Creatue user
            const user = await UserModel.create({
                email, password, firstName, lastName, profilePicture
            })

            return user;
        } catch (_) {
            throw new GraphQLError('InputValidationViolation', {
                extensions: { 
                    errors: errors }
            });
        }
    }
  }
}