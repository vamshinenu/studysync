import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Other tables here...

    messages: defineTable({
        groupId: v.string(),
        imgUrl: v.string(),
        message: v.string(),
        name: v.string(),
        userId: v.string(),
    })
        .index("by_groupId", ["groupId"])
    ,

    users: defineTable({
        firstname: v.string(),
        imageUrl: v.string(),
        lastName: v.string(),
        userId: v.string(),
    })
        .index("by_userId", ["userId"]),

    groups: defineTable({
        groupDescription: v.string(),
        groupName: v.string(),
        userId: v.string(),
    }),
});