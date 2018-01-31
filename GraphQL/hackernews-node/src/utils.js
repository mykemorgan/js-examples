const jwt = require('jsonwebtoken')

// Yeah, this is stupid. It's a demo!
// @TODO Get this from, you know, the environment.
const APP_SECRET = 'GraphQL-tutorial-secret';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (!Authorization) {
        throw new Error('Not authenticated');
    }

    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
}

module.exports = {
    APP_SECRET,
    getUserId
}
