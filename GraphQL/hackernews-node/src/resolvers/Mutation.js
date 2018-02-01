const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context, info) {
    const userId = getUserId(context);
    const { url, description } = args;
    return context.db.mutation.createLink(
        {
            data: {
                url,
                description,
                postedBy: { connect: { id: userId } }
            }
        },
        info);
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser({
        data: { ...args, password }
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.db.query.user({ where: { email: args.email } });
    if (!user) {
        // @TODO Peeking attack: message should be "Invalid username or password" for both errors
        throw new Error(`Could not find user with email: ${args.email}`)
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        // @TODO Peeking attack: message should be "Invalid username or password" for both errors
        throw new Error(`Invalid password for user: ${args.email}`)
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context);
    const { linkId } = args;

    // Have to vote for something that exists.
    const linkExists = await context.db.exists.Link({ id: linkId });
    if (!linkExists) {
        throw new Error(`Link does not exist: ${linkId}`);
    }

    // No double voting
    const voteExists = await context.db.exists.Vote({
        user: { id: userId },
        link: { id: linkId }
    });
    if (voteExists) {
        throw new Error(`User ${userId} already voted for: ${linkId}`);
    }

    // Create the vote.
    return context.db.mutation.createVote({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: linkId } }
        },
        info,
    })
}

module.exports = {
    post,
    signup,
    login,
    vote,
}