const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const getAppDataPath = require("appdata-path")

const closebtn = document.getElementById("close-button")
const remote = require('electron').remote;
const { ipcRenderer } = require('electron');
const win = remote.getCurrentWindow(); 
closebtn.addEventListener("click", () => {
    win.close()
})


ipcRenderer.on("login:infos", (err, docs) => {

    document.getElementById("usernameloggedin").innerHTML += `<button id="usernameloggedin" class="flex mx-auto mt-1 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">${docs.username}</button>`

    let opts = {
        clientPackage: null,
        authorization: Authenticator.getAuth(docs.username, docs.password),
        root: getAppDataPath(".minecraft"),
        version: {
        number: "1.16.5",
        type: "release",
        //custom: "1.16.5-OptiFine_HD_U_G7" // use this if optifine installed at .minecraft
    },
    memory: {
        max: "3G", // max 3072MB
        min: "2G" // min 2048MB
    }
}
var playbtn = document.getElementById("playbtn")

playbtn.addEventListener("click", () => {
    if(!docs) return;
    launcher.launch(opts);
})

})
launcher.on('debug', (e) => console.log(e));
launcher.on('data', (e) => console.log(e));
