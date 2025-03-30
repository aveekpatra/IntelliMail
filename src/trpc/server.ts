import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  // First await the headers() function
  const headersData = await headers();
  const heads = new Headers();

  // Manually copy needed headers instead of iteration
  // This avoids "...headers()" iterator issues
  if (headersData.has("x-trpc-source")) {
    heads.set("x-trpc-source", headersData.get("x-trpc-source") || "");
  } else {
    heads.set("x-trpc-source", "rsc");
  }

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const callerPromise = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  callerPromise,
  getQueryClient,
);
