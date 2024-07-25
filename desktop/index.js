const { initRemix } = require("remix-electron")
const { app, BrowserWindow } = require("electron")
const path = require("node:path")

/** @param {string} url */
async function createWindow(url) {
    const win = new BrowserWindow()

    await win.loadURL(url)
}

app.on("ready", async () => {
    const url = await initRemix({
        serverBuild: path.join(__dirname, "../build/index.js"),
        publicFolder: path.join(__dirname, "../public"),
    })
    await createWindow(url)
})

app.disableHardwareAcceleration()