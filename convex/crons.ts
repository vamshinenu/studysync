import { cronJobs } from "convex/server";
import { internal, api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
    "Make user offline",
    { minutes: 10 },
    api.users.makeUsersOffline,
    {}
)

export default crons;