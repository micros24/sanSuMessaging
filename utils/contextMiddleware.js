const { JWT_SECRET } = require('../config/env.json');
const jwt = require('jsonwebtoken');

module.exports = context => {
    // Token extraction
    if(context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization.split('Bearer ')[1];

    // Verify token
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if(err) throw new GraphQLError('Unauthenticated');
        context.user = decoded;
      });
    }

    return context;
}