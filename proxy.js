// import sudo from 'sudo-prompt';
import {execSync} from 'child_process';

function start() {

    stop();

    execSync('sudo launchctl load /Library/LaunchDaemons/com.tailscale.tailscaled.plist');
    execSync('launchctl start com.tailscale.tailscaled');
}

start();

function stop() {
    execSync('launchctl stop com.tailscale.tailscaled');
    execSync('sudo launchctl unload /Library/LaunchDaemons/com.tailscale.tailscaled.plist');
}