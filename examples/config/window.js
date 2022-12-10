/**
 * @Author: Seven69
 * @Date:   202-12-10 11:05:00
 *
 * @title:  BrowserWindow Class Options
 * @description: manager BrowserWindow options
 *
 * @ref: https://www.electronjs.org/docs/latest/api/browser-window#class-browserwindow
 */

const BaseWindowOptions = {
    // width: 800,
    // height: 600,
}

const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false,
    devTools: true,
}

module.exports = {
    BaseWindowOptions,
    webPreferences,

    title: 'SolopaceDoor',

    BaseWindowConfig: {
        ...BaseWindowOptions,
        webPreferences,
    }
}