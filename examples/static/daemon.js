const {execSync} = require('child_process');

function tryCreateDaemonPlist(content, path) {
    try {
       return {
           success: true,
           value: execSync(`sudo echo '${content}' > ${path}`),
           error: null
       }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        };
    }
}

function tryLoadDaemonPlist(path) {
    try {
        return {
            success: true,
            value: execSync(`sudo launchctl load ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        };
    }
}

function tryUnLoadDaemonPlist(path) {
    try {
        return {
            success: true,
            value: execSync(`sudo launchctl unload ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        };
    }
}

function tryRemoveDaemonPlist(path) {
    try {
        return {
            success: true,
            value: execSync(`rm ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        };
    }
}

function tryStartDaemon(path) {
    try {
        return {
            success: true,
            value: execSync(`launchctl start ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        };
    }
}

function tryStopDaemon(path) {
    try {
        return {
            success: true,
            value: execSync(`launchctl stop ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        }
    }
}

function tryRestartDaemon(path) {
    try {
        return {
            success: true,
            value: execSync(`launchctl restart ${path}`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        }
    }
}

function tryListDaemons() {
    try {
        return {
            success: true,
            value: execSync(`launchctl list`),
            error: null
        }
    } catch (e) {
        return {
            success: false,
            value: null,
            error: e
        }
    }
}

module.exports = {
    tryCreateDaemonPlist,
    tryLoadDaemonPlist,
    tryUnLoadDaemonPlist,
    tryRemoveDaemonPlist,
    tryStartDaemon,
    tryStopDaemon,
    tryRestartDaemon,
    tryListDaemons
}