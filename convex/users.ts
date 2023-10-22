import { mutation, query } from './_generated/server';
import { v } from 'convex/values';


export const createUser = mutation({
    args: {
        userId: v.string(),
        imageUrl: v.string(),
        firstname: v.string(),
        lastName: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.insert('users',
            {
                userId: args.userId,
                imageUrl: args.imageUrl,
                firstname: args.firstname,
                lastName: args.lastName,
                online: true,
            }
        )
        return user;
    },
});


export const getUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .withIndex('by_userId')
            .filter((q) => q.eq(q.field('userId'), args.userId))
            .first();

        return user;
    },
});

export const updateUserOnlineStatus = mutation({
    args: {
        id: v.string(),
        online: v.boolean(),
    },
    async handler(ctx, args) {
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('userId'), args.id)).first();
        if (!user) {
            return null;
        }
        return ctx.db.patch(user._id, { online: args.online })
    },
}
);

export const makeUsersOffline = mutation({
    async handler(ctx, args) {

        const onlineUsers = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('online'), true))
            .collect();

        if (onlineUsers.length === 0) return null;
        for (const user of onlineUsers) {
            await ctx.db.patch(user._id, { online: false })
        }
    },
}
);


// export const getUsers = query({
//     args: {
//         userIds: v.array(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const users = await ctx.db
//             .query('users').filter((q) => q.eq(q.field('userId'), args.userIds))
//             .collect();
//         return users;
//     },
// });
