const {ipcRenderer} = require('electron');

class SimpleIPCRenderSDK {
    createChannel(channel) {
        return new Promise((resolve, reject) => {
            ipcRenderer.on(channel, (event, payload) => {
                resolve(payload);
            });
        });
    }

    removeChannel(channel) {
        ipcRenderer.removeAllListeners(channel);
    }

    dispatch(to, payload) {
        ipcRenderer.send(to, {to, payload});
    }

    comminicate(to, payload) {
        return ipcRenderer.invoke(to, {to, payload});
    }
}

module.exports = {
    SimpleIPCRenderSDK
};