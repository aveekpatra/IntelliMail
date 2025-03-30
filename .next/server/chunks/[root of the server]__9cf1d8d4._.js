module.exports = {

"[project]/.next-internal/server/app/api/initial-sync/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[project]/src/env.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "env": (()=>env)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@t3-oss/env-nextjs/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [app-route] (ecmascript)");
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEnv"])({
    /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */ server: {
        DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().url(),
        NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].enum([
            "development",
            "test",
            "production"
        ]).default("development")
    },
    /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */ client: {
    },
    /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */ runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: ("TURBOPACK compile-time value", "development")
    },
    /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */ skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */ emptyStringAsUndefined: true
});
}}),
"[project]/src/server/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [app-route] (ecmascript)");
;
;
const createPrismaClient = ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
        log: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NODE_ENV === "development" ? [
            "error",
            "warn"
        ] : [
            "error"
        ]
    });
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? createPrismaClient();
if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NODE_ENV !== "production") globalForPrisma.prisma = db;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/lib/embeddings.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getEmbeddings": (()=>getEmbeddings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2d$edge$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/openai-edge/dist/index.mjs [app-route] (ecmascript)");
;
const config = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2d$edge$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Configuration"]({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2d$edge$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIApi"](config);
async function getEmbeddings(text) {
    try {
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text.replace(/\n/g, " ")
        });
        const result = await response.json();
        // console.log(result)
        return result.data[0].embedding;
    } catch (error) {
        console.log("error calling openai embeddings api", error);
        throw error;
    }
}
}}),
"[project]/src/lib/orama.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OramaManager": (()=>OramaManager)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$create$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@orama/orama/dist/methods/create.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$insert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@orama/orama/dist/methods/insert.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$search$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@orama/orama/dist/methods/search.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$plugin$2d$data$2d$persistence$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@orama/plugin-data-persistence/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/embeddings.ts [app-route] (ecmascript)");
;
;
;
;
class OramaManager {
    // @ts-ignore
    orama;
    accountId;
    constructor(accountId){
        this.accountId = accountId;
    }
    async initialize() {
        const account = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.findUnique({
            where: {
                id: this.accountId
            },
            select: {
                binaryIndex: true
            }
        });
        if (!account) throw new Error('Account not found');
        if (account.binaryIndex) {
            this.orama = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$plugin$2d$data$2d$persistence$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["restore"])('json', account.binaryIndex);
        } else {
            this.orama = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$create$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["create"])({
                schema: {
                    title: "string",
                    body: "string",
                    rawBody: "string",
                    from: 'string',
                    to: 'string[]',
                    sentAt: 'string',
                    embeddings: 'vector[1536]',
                    threadId: 'string'
                }
            });
            await this.saveIndex();
        }
    }
    async insert(document) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$insert$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insert"])(this.orama, document);
        await this.saveIndex();
    }
    async vectorSearch({ prompt, numResults = 10 }) {
        const embeddings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmbeddings"])(prompt);
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$search$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["search"])(this.orama, {
            mode: 'hybrid',
            term: prompt,
            vector: {
                value: embeddings,
                property: 'embeddings'
            },
            similarity: 0.80,
            limit: numResults
        });
        // console.log(results.hits.map(hit => hit.document))
        return results;
    }
    async search({ term }) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$methods$2f$search$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["search"])(this.orama, {
            term: term
        });
    }
    async saveIndex() {
        const index = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$plugin$2d$data$2d$persistence$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["persist"])(this.orama, 'json');
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.update({
            where: {
                id: this.accountId
            },
            data: {
                binaryIndex: index
            }
        });
    }
}
// Usage example:
async function main() {
    const oramaManager = new OramaManager('67358');
    await oramaManager.initialize();
    // Insert a document
    // const emails = await db.email.findMany({
    //     where: {
    //         thread: { accountId: '67358' }
    //     },
    //     select: {
    //         subject: true,
    //         bodySnippet: true,
    //         from: { select: { address: true, name: true } },
    //         to: { select: { address: true, name: true } },
    //         sentAt: true,
    //     },
    //     take: 100
    // })
    // await Promise.all(emails.map(async email => {
    //     // const bodyEmbedding = await getEmbeddings(email.bodySnippet || '');
    //     // console.log(bodyEmbedding)
    //     await oramaManager.insert({
    //         title: email.subject,
    //         body: email.bodySnippet,
    //         from: `${email.from.name} <${email.from.address}>`,
    //         to: email.to.map(t => `${t.name} <${t.address}>`),
    //         sentAt: email.sentAt.getTime(),
    //         // bodyEmbedding: bodyEmbedding,
    //     })
    // }))
    // Search
    const searchResults = await oramaManager.search({
        term: "cascading"
    });
    console.log(searchResults.hits.map((hit)=>hit.document));
} // main().catch(console.error);
}}),
"[project]/src/lib/turndown.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "turndown": (()=>turndown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$turndown$2f$lib$2f$turndown$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/turndown/lib/turndown.es.js [app-route] (ecmascript)");
;
const turndown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$turndown$2f$lib$2f$turndown$2e$es$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    strongDelimiter: '**',
    bulletListMarker: '-',
    linkStyle: 'inlined'
});
// Remove link tags
turndown.addRule('linkRemover', {
    filter: 'a',
    replacement: (content)=>content
});
// Remove style tags
turndown.addRule('styleRemover', {
    filter: 'style',
    replacement: ()=>''
});
// Remove script tags
turndown.addRule('scriptRemover', {
    filter: 'script',
    replacement: ()=>''
});
turndown.addRule('imageRemover', {
    filter: 'img',
    replacement: (content)=>content
});
}}),
"[project]/src/lib/sync-to-db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "syncEmailsToDatabase": (()=>syncEmailsToDatabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$limit$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/p-limit/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orama.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/embeddings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turndown$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/turndown.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function syncEmailsToDatabase(emails, accountId) {
    console.log(`Syncing ${emails.length} emails to database`);
    const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$p$2d$limit$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(10); // Process up to 10 emails concurrently
    const oramaClient = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OramaManager"](accountId);
    oramaClient.initialize();
    try {
        async function syncToOrama() {
            await Promise.all(emails.map((email)=>{
                return limit(async ()=>{
                    const body = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$turndown$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["turndown"].turndown(email.body ?? email.bodySnippet ?? '');
                    const payload = `From: ${email.from.name} <${email.from.address}>\nTo: ${email.to.map((t)=>`${t.name} <${t.address}>`).join(', ')}\nSubject: ${email.subject}\nBody: ${body}\n SentAt: ${new Date(email.sentAt).toLocaleString()}`;
                    const bodyEmbedding = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEmbeddings"])(payload);
                    await oramaClient.insert({
                        title: email.subject,
                        body: body,
                        rawBody: email.bodySnippet ?? '',
                        from: `${email.from.name} <${email.from.address}>`,
                        to: email.to.map((t)=>`${t.name} <${t.address}>`),
                        sentAt: new Date(email.sentAt).toLocaleString(),
                        embeddings: bodyEmbedding,
                        threadId: email.threadId
                    });
                });
            }));
        }
        async function syncToDB() {
            for (const [index, email] of emails.entries()){
                await upsertEmail(email, index, accountId);
            }
        }
        await Promise.all([
            syncToOrama(),
            syncToDB()
        ]);
        await oramaClient.saveIndex();
    } catch (error) {
        console.log('error', error);
    }
}
async function upsertEmail(email, index, accountId) {
    console.log(`Upserting email ${index + 1}`, JSON.stringify(email, null, 2));
    try {
        // determine email label type
        let emailLabelType = 'inbox';
        if (email.sysLabels.includes('inbox') || email.sysLabels.includes('important')) {
            emailLabelType = 'inbox';
        } else if (email.sysLabels.includes('sent')) {
            emailLabelType = 'sent';
        } else if (email.sysLabels.includes('draft')) {
            emailLabelType = 'draft';
        }
        // 1. Upsert EmailAddress records
        const addressesToUpsert = new Map();
        for (const address of [
            email.from,
            ...email.to,
            ...email.cc,
            ...email.bcc,
            ...email.replyTo
        ]){
            addressesToUpsert.set(address.address, address);
        }
        const upsertedAddresses = [];
        for (const address of addressesToUpsert.values()){
            const upsertedAddress = await upsertEmailAddress(address, accountId);
            upsertedAddresses.push(upsertedAddress);
        }
        const addressMap = new Map(upsertedAddresses.filter(Boolean).map((address)=>[
                address.address,
                address
            ]));
        const fromAddress = addressMap.get(email.from.address);
        if (!fromAddress) {
            console.log(`Failed to upsert from address for email ${email.bodySnippet}`);
            return;
        }
        const toAddresses = email.to.map((addr)=>addressMap.get(addr.address)).filter(Boolean);
        const ccAddresses = email.cc.map((addr)=>addressMap.get(addr.address)).filter(Boolean);
        const bccAddresses = email.bcc.map((addr)=>addressMap.get(addr.address)).filter(Boolean);
        const replyToAddresses = email.replyTo.map((addr)=>addressMap.get(addr.address)).filter(Boolean);
        // 2. Upsert Thread
        const thread = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].thread.upsert({
            where: {
                id: email.threadId
            },
            update: {
                subject: email.subject,
                accountId,
                lastMessageDate: new Date(email.sentAt),
                done: false,
                participantIds: [
                    ...new Set([
                        fromAddress.id,
                        ...toAddresses.map((a)=>a.id),
                        ...ccAddresses.map((a)=>a.id),
                        ...bccAddresses.map((a)=>a.id)
                    ])
                ]
            },
            create: {
                id: email.threadId,
                accountId,
                subject: email.subject,
                done: false,
                draftStatus: emailLabelType === 'draft',
                inboxStatus: emailLabelType === 'inbox',
                sentStatus: emailLabelType === 'sent',
                lastMessageDate: new Date(email.sentAt),
                participantIds: [
                    ...new Set([
                        fromAddress.id,
                        ...toAddresses.map((a)=>a.id),
                        ...ccAddresses.map((a)=>a.id),
                        ...bccAddresses.map((a)=>a.id)
                    ])
                ]
            }
        });
        // 3. Upsert Email
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].email.upsert({
            where: {
                id: email.id
            },
            update: {
                threadId: thread.id,
                createdTime: new Date(email.createdTime),
                lastModifiedTime: new Date(),
                sentAt: new Date(email.sentAt),
                receivedAt: new Date(email.receivedAt),
                internetMessageId: email.internetMessageId,
                subject: email.subject,
                sysLabels: email.sysLabels,
                keywords: email.keywords,
                sysClassifications: email.sysClassifications,
                sensitivity: email.sensitivity,
                meetingMessageMethod: email.meetingMessageMethod,
                fromId: fromAddress.id,
                to: {
                    set: toAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                cc: {
                    set: ccAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                bcc: {
                    set: bccAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                replyTo: {
                    set: replyToAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                hasAttachments: email.hasAttachments,
                internetHeaders: email.internetHeaders,
                body: email.body,
                bodySnippet: email.bodySnippet,
                inReplyTo: email.inReplyTo,
                references: email.references,
                threadIndex: email.threadIndex,
                nativeProperties: email.nativeProperties,
                folderId: email.folderId,
                omitted: email.omitted,
                emailLabel: emailLabelType
            },
            create: {
                id: email.id,
                emailLabel: emailLabelType,
                threadId: thread.id,
                createdTime: new Date(email.createdTime),
                lastModifiedTime: new Date(),
                sentAt: new Date(email.sentAt),
                receivedAt: new Date(email.receivedAt),
                internetMessageId: email.internetMessageId,
                subject: email.subject,
                sysLabels: email.sysLabels,
                internetHeaders: email.internetHeaders,
                keywords: email.keywords,
                sysClassifications: email.sysClassifications,
                sensitivity: email.sensitivity,
                meetingMessageMethod: email.meetingMessageMethod,
                fromId: fromAddress.id,
                to: {
                    connect: toAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                cc: {
                    connect: ccAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                bcc: {
                    connect: bccAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                replyTo: {
                    connect: replyToAddresses.map((a)=>({
                            id: a.id
                        }))
                },
                hasAttachments: email.hasAttachments,
                body: email.body,
                bodySnippet: email.bodySnippet,
                inReplyTo: email.inReplyTo,
                references: email.references,
                threadIndex: email.threadIndex,
                nativeProperties: email.nativeProperties,
                folderId: email.folderId,
                omitted: email.omitted
            }
        });
        const threadEmails = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].email.findMany({
            where: {
                threadId: thread.id
            },
            orderBy: {
                receivedAt: 'asc'
            }
        });
        let threadFolderType = 'sent';
        for (const threadEmail of threadEmails){
            if (threadEmail.emailLabel === 'inbox') {
                threadFolderType = 'inbox';
                break; // If any email is in inbox, the whole thread is in inbox
            } else if (threadEmail.emailLabel === 'draft') {
                threadFolderType = 'draft'; // Set to draft, but continue checking for inbox
            }
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].thread.update({
            where: {
                id: thread.id
            },
            data: {
                draftStatus: threadFolderType === 'draft',
                inboxStatus: threadFolderType === 'inbox',
                sentStatus: threadFolderType === 'sent'
            }
        });
        // 4. Upsert Attachments
        for (const attachment of email.attachments){
            await upsertAttachment(email.id, attachment);
        }
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["Prisma"].PrismaClientKnownRequestError) {
            console.log(`Prisma error for email ${email.id}: ${error.message}`);
        } else {
            console.log(`Unknown error for email ${email.id}: ${error}`);
        }
    }
}
async function upsertEmailAddress(address, accountId) {
    try {
        const existingAddress = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].emailAddress.findUnique({
            where: {
                accountId_address: {
                    accountId: accountId,
                    address: address.address ?? ""
                }
            }
        });
        if (existingAddress) {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].emailAddress.update({
                where: {
                    id: existingAddress.id
                },
                data: {
                    name: address.name,
                    raw: address.raw
                }
            });
        } else {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].emailAddress.create({
                data: {
                    address: address.address ?? "",
                    name: address.name,
                    raw: address.raw,
                    accountId
                }
            });
        }
    } catch (error) {
        console.log(`Failed to upsert email address: ${error}`);
        return null;
    }
}
async function upsertAttachment(emailId, attachment) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].emailAttachment.upsert({
            where: {
                id: attachment.id ?? ""
            },
            update: {
                name: attachment.name,
                mimeType: attachment.mimeType,
                size: attachment.size,
                inline: attachment.inline,
                contentId: attachment.contentId,
                content: attachment.content,
                contentLocation: attachment.contentLocation
            },
            create: {
                id: attachment.id,
                emailId,
                name: attachment.name,
                mimeType: attachment.mimeType,
                size: attachment.size,
                inline: attachment.inline,
                contentId: attachment.contentId,
                content: attachment.content,
                contentLocation: attachment.contentLocation
            }
        });
    } catch (error) {
        console.log(`Failed to upsert attachment for email ${emailId}: ${error}`);
    }
}
;
}}),
"[project]/src/lib/account.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sync$2d$to$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sync-to-db.ts [app-route] (ecmascript)");
;
;
;
const API_BASE_URL = 'https://api.aurinko.io/v1';
class Account {
    token;
    constructor(token){
        this.token = token;
    }
    async startSync(daysWithin) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/email/sync`, {}, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            params: {
                daysWithin,
                bodyType: 'html'
            }
        });
        return response.data;
    }
    async createSubscription() {
        const webhookUrl = ("TURBOPACK compile-time truthy", 1) ? 'https://potatoes-calculator-reports-crisis.trycloudflare.com' : ("TURBOPACK unreachable", undefined);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].post('https://api.aurinko.io/v1/subscriptions', {
            resource: '/email/messages',
            notificationUrl: webhookUrl + '/api/aurinko/webhook'
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    async syncEmails() {
        const account = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.findUnique({
            where: {
                token: this.token
            }
        });
        if (!account) throw new Error("Invalid token");
        if (!account.nextDeltaToken) throw new Error("No delta token");
        let response = await this.getUpdatedEmails({
            deltaToken: account.nextDeltaToken
        });
        let allEmails = response.records;
        let storedDeltaToken = account.nextDeltaToken;
        if (response.nextDeltaToken) {
            storedDeltaToken = response.nextDeltaToken;
        }
        while(response.nextPageToken){
            response = await this.getUpdatedEmails({
                pageToken: response.nextPageToken
            });
            allEmails = allEmails.concat(response.records);
            if (response.nextDeltaToken) {
                storedDeltaToken = response.nextDeltaToken;
            }
        }
        if (!response) throw new Error("Failed to sync emails");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sync$2d$to$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncEmailsToDatabase"])(allEmails, account.id);
        } catch (error) {
            console.log('error', error);
        }
        // console.log('syncEmails', response)
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.update({
            where: {
                id: account.id
            },
            data: {
                nextDeltaToken: storedDeltaToken
            }
        });
    }
    async getUpdatedEmails({ deltaToken, pageToken }) {
        // console.log('getUpdatedEmails', { deltaToken, pageToken });
        let params = {};
        if (deltaToken) {
            params.deltaToken = deltaToken;
        }
        if (pageToken) {
            params.pageToken = pageToken;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/email/sync/updated`, {
            params,
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
        return response.data;
    }
    async performInitialSync() {
        try {
            // Start the sync process
            const daysWithin = 3;
            let syncResponse = await this.startSync(daysWithin); // Sync emails from the last 7 days
            // Wait until the sync is ready
            while(!syncResponse.ready){
                await new Promise((resolve)=>setTimeout(resolve, 1000)); // Wait for 1 second
                syncResponse = await this.startSync(daysWithin);
            }
            // console.log('Sync is ready. Tokens:', syncResponse);
            // Perform initial sync of updated emails
            let storedDeltaToken = syncResponse.syncUpdatedToken;
            let updatedResponse = await this.getUpdatedEmails({
                deltaToken: syncResponse.syncUpdatedToken
            });
            // console.log('updatedResponse', updatedResponse)
            if (updatedResponse.nextDeltaToken) {
                storedDeltaToken = updatedResponse.nextDeltaToken;
            }
            let allEmails = updatedResponse.records;
            // Fetch all pages if there are more
            while(updatedResponse.nextPageToken){
                updatedResponse = await this.getUpdatedEmails({
                    pageToken: updatedResponse.nextPageToken
                });
                allEmails = allEmails.concat(updatedResponse.records);
                if (updatedResponse.nextDeltaToken) {
                    storedDeltaToken = updatedResponse.nextDeltaToken;
                }
            }
            // console.log('Initial sync complete. Total emails:', allEmails.length);
            // Store the nextDeltaToken for future incremental syncs
            // Example of using the stored delta token for an incremental sync
            // await this.performIncrementalSync(storedDeltaToken);
            return {
                emails: allEmails,
                deltaToken: storedDeltaToken
            };
        } catch (error) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
                console.error('Error during sync:', JSON.stringify(error.response?.data, null, 2));
            } else {
                console.error('Error during sync:', error);
            }
        }
    }
    async sendEmail({ from, subject, body, inReplyTo, references, threadId, to, cc, bcc, replyTo }) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/email/messages`, {
                from,
                subject,
                body,
                inReplyTo,
                references,
                threadId,
                to,
                cc,
                bcc,
                replyTo: [
                    replyTo
                ]
            }, {
                params: {
                    returnIds: true
                },
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            console.log('sendmail', response.data);
            return response.data;
        } catch (error) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
                console.error('Error sending email:', JSON.stringify(error.response?.data, null, 2));
            } else {
                console.error('Error sending email:', error);
            }
            throw error;
        }
    }
    async getWebhooks() {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/subscriptions`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    async createWebhook(resource, notificationUrl) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/subscriptions`, {
            resource,
            notificationUrl
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
    async deleteWebhook(subscriptionId) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].delete(`${API_BASE_URL}/subscriptions/${subscriptionId}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
}
const __TURBOPACK__default__export__ = Account;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/initial-sync/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST),
    "maxDuration": (()=>maxDuration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sync$2d$to$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sync-to-db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
;
const maxDuration = 300;
const POST = async (req)=>{
    const body = await req.json();
    const { accountId, userId } = body;
    if (!accountId || !userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "INVALID_REQUEST"
    }, {
        status: 400
    });
    const dbAccount = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.findUnique({
        where: {
            id: accountId,
            userId
        }
    });
    if (!dbAccount) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "ACCOUNT_NOT_FOUND"
    }, {
        status: 404
    });
    const account = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](dbAccount.token);
    await account.createSubscription();
    const response = await account.performInitialSync();
    if (!response) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "FAILED_TO_SYNC"
    }, {
        status: 500
    });
    const { deltaToken, emails } = response;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sync$2d$to$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncEmailsToDatabase"])(emails, accountId);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].account.update({
        where: {
            token: dbAccount.token
        },
        data: {
            nextDeltaToken: deltaToken
        }
    });
    console.log('sync complete', deltaToken);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        deltaToken
    }, {
        status: 200
    });
};
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__9cf1d8d4._.js.map