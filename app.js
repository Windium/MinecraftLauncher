const electron = require("electron");
const url = require("url");
const path = require("path");
const { Menu, app, BrowserWindow, ipcMain } = electron;

let mainwindow;

app.on("ready", () => {
    
    mainwindow = new BrowserWindow({
        webPreferences:{
            preload: true,
            nodeIntegration: true,
            enableRemoteModule: true
        },
        width: 1000,
        height: 600,
        frame: false,
    });

    Menu.setApplicationMenu(null)
    //mainwindow.webContents.openDevTools()
    mainwindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/index.html'),
        protocol: 'file:'
        
    }));
    createWindow()

    ipcMain.on("login:close", () => {
      addWindow.close();
      addWindow = null;
    });

    var logininfos = new Map()

    let username = {}
    let password = {}

    ipcMain.on("login:info", (err, docs) => {
      //console.log(docs)
      mainwindow.webContents.send("login:infos", { username: docs.username, pass: docs.password })
    })
});

function createWindow() {
    addWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        },
      width: 475,
      height: 175,
      title: "Login",
      frame: false,
      parent: mainwindow
    });
    //addWindow.webContents.openDevTools()
    addWindow.setResizable(false);
  
    addWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "/views/login.html"),
        protocol: "file:",
      })
    );
  
    addWindow.on("close", () => {
      addWindow = null;
    });
  }