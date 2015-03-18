function exitFromApp() {
    removeListeners();
    if (navigator.app) {
        navigator.app.exitApp();
    }
    else if (navigator.device) {
        navigator.device.exitApp();
    }
}

function removeListeners() {
    document.getElementById("quit").removeEventListener("click", exitFromApp, false);
    document.removeEventListener("deviceready", addListener, true);
}

function addListener() {
    document.getElementById("quit").addEventListener("click", exitFromApp, false);
}



document.addEventListener("deviceready", addListener, true);

