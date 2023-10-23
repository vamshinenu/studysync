import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const generateImageUrl = query({
    args: { storageId: v.optional(v.string()) },
    async handler(ctx, args) {
        if (!args.storageId) return undefined;
        return await ctx.storage.getUrl(args.storageId);
    }
});

export const createMessage = mutation({
    args: {
        userId: v.string(),
        message: v.string(),
        name: v.string(),
        groupId: v.string(),
        imgUrl: v.string(),
        format: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const newMessage = await ctx.db.insert('messages',
            {
                message: args.message,
                userId: args.userId,
                name: args.name,
                groupId: args.groupId,
                imgUrl: args.imgUrl,
                format: args.format,
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
        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("groupId"), args.groupId))
            .order("desc")
            .paginate(args.paginationOpts)

        return messages;
    },
});
