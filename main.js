"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var electron_1 = require("electron");
var font_list_1 = require("font-list");
// Set env
process.env.NODE_ENV = 'development';
var isDev = process.env.NODE_ENV !== 'production';
var isMac = process.platform === 'darwin';
function createAboutWindow() {
    var aboutWindow = new electron_1.BrowserWindow({
        title: 'Clavier phonétique',
        width: 300,
        height: 300,
        icon: __dirname + "/assets/icons/Icon_256x256.png",
        resizable: false,
        backgroundColor: 'white',
        webPreferences: {
            contextIsolation: false
        }
    });
    aboutWindow.loadFile(__dirname + "/dist/phonetik/about.html")
        .then(function () { return console.log('About window loaded'); })["catch"](function (err) { return console.log('About cannot be loaded ', err); });
}
function createMainWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        title: 'Phonetik',
        width: 1024,
        height: 768,
        icon: __dirname + "/assets/icons/Icon_256x256.png",
        resizable: isDev,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(__dirname + "/dist/phonetik/index.html")
        .then(function () { return console.log('Main window loaded'); })["catch"](function (err) { return console.log('Main window cannot be loaded ', err); });
    return mainWindow;
}
electron_1.app.on('ready', function () {
    var mainWindow = createMainWindow();
    var mainMenu = electron_1.Menu.buildFromTemplate(menu);
    electron_1.Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', function () { return mainWindow = null; });
});
var menu = __spreadArrays((isMac ? [
    {
        label: electron_1.app.name,
        submenu: [
            {
                label: 'About',
                click: function () { return createAboutWindow(); }
            }
        ]
    }
] : []), [
    {
        role: 'fileMenu'
    }
], (!isMac ? [
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: function () { return createAboutWindow(); }
            }
        ]
    }
] : []), (isDev ? [
    {
        label: 'Developer',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggleDevtools' },
        ]
    },
] : []));
electron_1.app.on('window-all-closed', function () {
    if (isMac) {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
// Retrieves list of fonts
electron_1.ipcMain.on('request-font-list', function (event) {
    font_list_1.getFonts({ disableQuoting: true })
        .then(function (fonts) {
        event.returnValue = fonts;
    })["catch"](function (err) {
        console.log('Error retrieving fonts: ', err);
        event.returnValue = [];
    });
});
