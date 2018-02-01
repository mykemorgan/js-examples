// There 'where' clause is not working (Jan 24, 2018):
// https://github.com/howtographql/howtographql/issues/456
// Being resolved in this issue?
// https://github.com/graphcool/prisma/issues/1734
//
// Haha and the tutorial has been updated Jan 31?
// Not sure why I'm not seeing it if I loaded the page Feb 1st...
const newLink = {
    subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.link(
            { /* where: { mutation_in: ['CREATED'] } */ },
            info
        )
    }
}

const newVote = {
    subscribe: (parent, args, ctx, info) => {
        return ctx.db.subscription.vote(
            { /* where: { mutation_in: ['CREATED'] } */ },
            info
        )
    }
}

module.exports = {
    newLink,
    newVote,
}
