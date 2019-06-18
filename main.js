const { app, BrowserWindow, ipcMain } = require('electron')
require('electron-reload')('web');

let win

function handleWindowAction(window, action)
{
  if(action == "close")
  {
    console.log("Closing Window");
    window.close();
  }

  else if(action == "min")
  {
    console.log("Minimizing Window");
    window.minimize();
  }

  else if(action == "zoom")
  {
    if(window.isMaximized())
    {
      console.log("Un-Maximizing Window");
      window.unmaximize();
    }

    else
    {
      console.log("Maximizing Window");
      window.maximize();
    }
  }

  else
  {
    console.log("Unhandled Window Action: " + action);
  }
}

function createWindow () 
{
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('web/index.html')
  win.on('closed', () => {
    win = null;
  })
  ipcMain.on('window:action', (event, arg) => {
    if(win != null)
    {
      handleWindowAction(win, arg);
    }
  });
  ipcMain.on('platform:query', (event, arg) => {
    if(win != null)
    {
      event.returnValue = process.platform;
    }
  });
}

function initEvents()
{
  app.on('ready', createWindow)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
}

initEvents();