/** @type {import("@remix-run/dev").AppConfig} */
module.exports = {
    serverModuleFormat: "cjs",
    browserNodeBuiltinsPolyfill: { modules: { url: true, path: true } },
    serverDependenciesToBundle: [
        /remix-utils/ // not "remix-utils"
    ],
}
