function isElectron()
{
    return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
}

function getPlatform()
{
    const {ipcRenderer} = require('electron');
    return ipcRenderer.sendSync('platform:query', 'derp');
}

function sendWindowAction(action)
{
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('window:action', action);
}

function closeElectronWindow()
{
    sendWindowAction('close');
}

function minimizeElectronWindow()
{
    sendWindowAction('min');
}

function zoomElectronWindow()
{
    sendWindowAction('zoom');
}

function isMac()
{
    return getPlatform() == 'darwin';
}

function constructFrame()
{
    var div = document.getElementById('app-frame-buttons');

    if(isMac())
    {
        console.log("Macintosh");
        div.classList.add("framebuttonsmac");
    }
}

function mountApplication()
{
    if(isElectron())
    {
        console.log("Using Electron, Configuring App Frame");
        constructFrame();
    }

    else
    {
        console.log("Not Electron, Removing app Frame");
        var div = document.getElementById('app-frame');
        div.parentNode.removeChild(div);
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme); 
}

mountApplication();
setTheme("dark");
