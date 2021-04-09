const user = document.getElementById("user")
const pass = document.getElementById("pass")
const loginbtn = document.querySelector("#login")

const {ipcRenderer} = require("electron")


loginbtn.addEventListener("click", () => {
    ipcRenderer.send("login:info", { username: user.value, password: pass.value});
    ipcRenderer.send("login:close")
})
