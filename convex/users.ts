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
            }
        )
        return user;
    },
});


export const getUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const users = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('userId'), args.userId))
            .collect();
        return users;
    },
});


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
