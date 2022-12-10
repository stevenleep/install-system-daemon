const { app, BrowserWindow } = require('electron');
const { staticEntryHtml } = require('./config/constant');
const { BaseWindowConfig } = require('./config/window');

let win;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    win = new BrowserWindow(BaseWindowConfig);
    win.loadFile(staticEntryHtml);
}

async function run() {
    const isReady = await app.whenReady();
    createWindow();
    BrowserWindow.fromWebContents(win.webContents).webContents.openDevTools();
}

// call
run();
