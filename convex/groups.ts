import { mutation, query } from './_generated/server';
import { v } from 'convex/values';


export const createGroup = mutation({
    args: {
        userId: v.string(),
        groupName: v.string(),
        groupDescription: v.string(),
        latitude: v.number(),
        longitude: v.number(),
    },
    handler: async (ctx, args) => {
        const checkUser = ctx.auth.getUserIdentity();
        if (!checkUser) return null;
        const group = await ctx.db.insert('groups',
            {
                userId: args.userId,
                groupName: args.groupName,
                groupDescription: args.groupDescription,
                users: [args.userId],
                latitude: args.latitude,
                longitude: args.longitude,

            }
        )
        return group;
    },
});

export const getGroup = query({
    args: { groupId: v.string() },
    handler: async (ctx, args) => {

        const checkUser = ctx.auth.getUserIdentity();
        if (!checkUser) return null;
        const group = await ctx.db
            .query('groups')
            .filter((q) => q.eq(q.field('_id'), args.groupId))
            .unique()
        return group;
    },
});

export const getGroups = query({
    args: { longitude: v.number(), latitude: v.number() },

    async handler(ctx, args) {
        const checkUser = ctx.auth.getUserIdentity();
        if (!checkUser) return null;

        console.log("THis is the location");
        console.log(args.longitude);
        console.log(args.latitude);



        return ctx.db.query('groups')
            .filter((q) => q.eq(q.field('longitude'), args.longitude))
            .filter((q) => q.eq(q.field('latitude'), args.latitude))
            .collect();
    }
});


export const joinGroup = mutation({
    args: { userId: v.string(), groupId: v.id("groups") },
    async handler(ctx, args) {
        const group = await ctx.db.get(args.groupId);
        if (!group) return null;
        const users = group!.users || [];
        ctx.db.patch(args.groupId, { users: [...users, args.userId] })
    },
});

export const getMembersOfGroup = query({
    args: { groupId: v.optional(v.id("groups")) },
    async handler(ctx, args) {
        const checkUser = ctx.auth.getUserIdentity();
        if (!checkUser) return null;


        if (!args.groupId) return null;


        const group = await ctx.db.get(args.groupId);
        if (!group) return null;
        const usersInGroup = group!.users || [];

        let allUsers = []
        // Fetch online status of all users in the group
        for (const user of usersInGroup) {
            const _user = ctx.db
                .query('users')
                .withIndex('by_userId')
                .filter((q) => q.eq(q.field('userId'), user))
                .first()
            // return user;
            allUsers.push(_user);
        }

        const users = await Promise.all(allUsers)


        return users;
    }
})


export const getOnlineUsersForGroup = query({
    args: { groupId: v.optional(v.id("groups")) },
    async handler(ctx, args) {
        const checkUser = ctx.auth.getUserIdentity();
        if (!checkUser) return null;
        console.log(args.groupId);

        // Fetch the group by ID
        if (!args.groupId) return null;

        const group = await ctx.db.get(args.groupId);

        console.log(group);

        // const group = await ctx.db.query('groups')
        //     .filter((q) => q.eq(q.field('_id'), args.groupId))
        //     .first();
        if (!group) {
            return null;
        }
        // Fetch all users in the group
        const usersInGroup = group.users || [];

        // console.log(usersInGroup);
        // return usersInGroup;

        let allUsers = []
        // Fetch online status of all users in the group
        for (const user of usersInGroup) {
            const _user = ctx.db
                .query('users')
                .withIndex('by_userId')
                .filter((q) => q.eq(q.field('userId'), user))
                .first()
            // return user;
            allUsers.push(_user);
        }

        // return allUsers;


        const users = await Promise.all(allUsers)

        return users.filter((user) => user!.online === true)
    },
});
