import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: createTRPCRouter({
    hello: publicProcedure
      .input(z.object({ text: z.string() }))
      .query(({ input }) => {
        return { greeting: `Hello ${input.text}` };
      }),
    getLatest: publicProcedure.query(() => {
      // Implement your getLatest logic here
      return {
        /* your data */
      };
    }),
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
