import { createTRPCRouter } from "~/server/api/trpc";
import { messageRouter } from "./routers/message";
import { channelRouter } from "./routers/channel";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  message: messageRouter,
  channel: channelRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
