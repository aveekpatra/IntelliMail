const CHUNK_PUBLIC_PATH = "server/app/page.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_3945e1._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@clerk_backend_dist_ba645c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_tailwind-merge_dist_bundle-mjs_mjs_6bc68a._.js");
runtime.loadChunk("server/chunks/ssr/_3a5200._.js");
runtime.loadChunk("server/chunks/ssr/src_dec812._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript, action, ecmascript)\" } [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/page { COMPONENT_0 => \"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_2 => \"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;
