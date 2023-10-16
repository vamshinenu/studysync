import { mutation, query } from './_generated/server';
import { v } from 'convex/values';


export const createGroup = mutation({
    args: {
        userId: v.string(),
        groupName: v.string(),
        groupDescription: v.string(),
    },
    handler: async (ctx, args) => {
        const group = await ctx.db.insert('groups',
            {
                userId: args.userId,
                groupName: args.groupName,
                groupDescription: args.groupDescription,
            }
        )
        return group;
    },
});

export const getGroup = query({
    args: { groupId: v.string() },
    handler: async (ctx, args) => {
        const group = await ctx.db
            .query('groups')
            .filter((q) => q.eq(q.field('_id'), args.groupId))
            .unique()

        return group;
    },
});
