import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type TRPCContext = {
  headers: Headers;
};

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  try {
    const headersList = await headers();
    return {
      headers: headersList,
    };
  } catch (error) {
    // Fallback for when headers() fails during build or SSR
    console.warn("Failed to get headers in tRPC context:", error);
    return {
      headers: new Headers(),
    };
  }
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  try {
    const session = await auth.api.getSession({
      headers: ctx.headers,
    });

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return next({ ctx: { ...ctx, auth: session } });
  } catch (error) {
    console.error("Auth error in protectedProcedure:", error);
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
});

export const optionalProtectedProcedure = baseProcedure.use(
  async ({ ctx, next }) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.headers,
      });

      return next({ ctx: { ...ctx, auth: session || null } });
    } catch (error) {
      console.error("Auth error in optionalProtectedProcedure:", error);
      return next({ ctx: { ...ctx, auth: null } });
    }
  }
);
