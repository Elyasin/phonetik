import {app, BrowserWindow, Menu, ipcMain} from 'electron';
import {getFonts} from 'font-list';


// Set env
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createAboutWindow(): void {
  const aboutWindow: BrowserWindow = new BrowserWindow({
    title: 'Clavier phonétique',
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: 'white',
    webPreferences: {
      contextIsolation: false
    }
  });

  aboutWindow.loadFile(`${__dirname}/dist/phonetik/about.html`)
    .then(() => console.log('About window loaded'))
    .catch(err => console.log('About cannot be loaded ', err));
}

function createMainWindow(): BrowserWindow {
  const mainWindow: BrowserWindow = new BrowserWindow({
    title: 'Phonetik',
    width: 1024,
    height: 768,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
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
  mainWindow.loadFile(`${__dirname}/dist/phonetik/index.html`)
    .then(() => console.log('Main window loaded'))
    .catch(err => console.log('Main window cannot be loaded ', err));

  return mainWindow;
}

app.on('ready', () => {
  let mainWindow: BrowserWindow = createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on('closed', (): void => mainWindow = null);
});

const menu: any = [
  ...(isMac ? [
    {
      label: app.name,
      submenu: [
        {
          label: 'About',
          click: () => createAboutWindow(),
        }
      ]
    }
  ] : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => createAboutWindow(),
        }
      ]
    }
  ] : []),
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {type: 'separator'},
        {role: 'toggleDevtools'},
      ],
    },
  ] : []),
];

app.on('window-all-closed', () => {
  if (isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});


// Retrieves list of fonts
ipcMain.on('request-font-list', (event) => {
  getFonts({disableQuoting: true})
    .then((fonts: string[]) => {
      event.returnValue = fonts;
    })
    .catch((err: string) => {
      console.log('Error retrieving fonts: ', err);
      event.returnValue = [];
    });
});
