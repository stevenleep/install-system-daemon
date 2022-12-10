const sudo = require('sudo-prompt');
const {title} = require('../config/window');

const options = {
    name: title,
}

function tryGetSudoPermission(command) {
    return new Promise((resolve, reject) => {
        sudo.exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject({error, status: false, stderr, stdout });
            } else {
                resolve({status: true, stderr, stdout });
            }
        });
    });
}

module.exports = {
    tryGetSudoPermission,
}