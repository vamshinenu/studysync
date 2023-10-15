import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';


export const createMessage = mutation({
    args: {
        userId: v.string(),
        message: v.string(),
        name: v.string(),
        groupId: v.string(),
        imgUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const newMessage = await ctx.db.insert('messages',
            {
                message: args.message,
                userId: args.userId,
                name: args.name,
                groupId: args.groupId,
                imgUrl: args.imgUrl,
            }
        )
        return newMessage;
    },
});


// export const getMessages = query({
//     args: { groupId: v.string() },
//     handler: async (ctx, args) => {
//         const message = await ctx.db
//             .query('messages')
//             .filter((q) => q.eq(q.field('groupId'), args.groupId))
//             .collect();
//         return message;
//     },
// });


export const getMessages = query({
    args: { groupId: v.string(), paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("groupId"), args.groupId))
            .order("desc")
            .paginate(args.paginationOpts);
    },
});
