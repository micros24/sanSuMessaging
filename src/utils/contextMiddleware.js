const { JWT_SECRET } = require('../config/env.json');
const jwt = require('jsonwebtoken');

module.exports = async context => {
    let token;
    // Token extraction
    if(context.req && context.req.headers.authorization) {
      token = context.req.headers.authorization;
    } else if(context.connectionParams && context.connectionParams.Authorization) {
      token = context.connectionParams.Authorization;
    }

    // Verify token
    if(token) {
      jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if(err) throw new GraphQLError('Unauthenticated');
        context.user = decoded;
      });
    }

    return context;
}