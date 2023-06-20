const { GraphQLError } = require ('graphql');
const { Op } = require("sequelize");
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
            if(!user) throw new GraphQLError('Unauthenticated');
            if(name.trim() === '') {
                throw "The name cannot be empty!";
            }

            let users;
            if(validateEmail(name)) {
                // Input is an email address
                users = await UserModel.findAll({
                    where: { 
                        email: { [Op.ne]: name }
                     }
                });
            } else {
                // Input is a name
                let names = [];
                if(hasWhiteSpace(name)) {
                    // Input is a first name and last name
                    // Separate each name into an array
                    var stringArray = name.split(/(\s+)/);
                    for(var i =0; i < stringArray.length; i++) {
                        // If array value is not a whitespace, push into names array
                        if(stringArray[i] !== ' ') names.push(stringArray[i]);
                    }
                } else {
                    // Input is a string with no spaces
                    // Check if its' a first name
                    names.push(name);

                    users = await UserModel.findAll({
                        where: { 
                            email: { [Op.ne]: user.email },
                            firstName: { [Op.in]: names }
                         },
                         order: [['createdAt', 'DESC']]
                    });

                    // Check if its' a last name
                    if(!users[0]) {
                        users = await UserModel.findAll({
                            where: { 
                                email: { [Op.ne]: user.email },
                                lastName: { [Op.in]: names }
                             },
                             order: [['createdAt', 'DESC']]
                        });
                    }
                }
            }

            // User is not registered
            if(!users[0]) throw "A person with that name/email is not registered.";

            return users;
        } catch (err) {
            if(typeof(err) === "string") {
                throw new GraphQLError('InputValidationViolation', {
                    extensions: { 
                        errors: err }
                });
            } else throw err;
        };
};