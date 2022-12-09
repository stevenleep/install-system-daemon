import sudoPrompt from 'sudo-prompt';
import {copyFileSync} from 'fs';
import {execSync} from 'child_process';

copyFileSync('lib/tailscaled', '/usr/local/bin/tailscaled');
execSync('chmod +x /usr/local/bin/tailscaled');

// 写一个文件
// /Library/LaunchDaemons/com.tailscale.tailscaled.plist
const plist = `
<?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>

     <key>Label</key>
     <string>com.tailscale.tailscaled</string>

     <key>ProgramArguments</key>
     <array>
       <string>/usr/local/bin/tailscaled</string>
     </array>

     <key>RunAtLoad</key>
     <true/>

   </dict>
   </plist>
 `;
// writeFileSync('/Library/LaunchDaemons/com.tailscale.tailscaled.plist', plist);
sudoPrompt.exec('echo "' + plist + '" > /Library/LaunchDaemons/com.tailscale.tailscaled.plist', {name: 'Echo Plist'}, function(error, stdout, stderr) {
    console.log("--->", stdout, error);
        if(!error) {
            execSync('node proxy.js');
        }
});
// copyFileSync('lib/com.tailscale.tailscaled.plist', '/Library/LaunchDaemons/com.tailscale.tailscaled.plist');
// sudoPrompt.exec('launchctl load /Library/LaunchDaemons/com.tailscale.tailscaled.plist', {name: 'Load Plist'}, function(error, stdout, stderr) {
//     console.log("runing --->", stdout, error);
// });
// sudoPrompt.exec('cp lib/com.tailscale.tailscaled.plist /Library/LaunchDaemons/com.tailscale.tailscaled.plist', {name: 'Copy Plist'}, function(error, stdout, stderr) {
//     console.log("runing --->", stdout, error);
//
// });
// sudoPrompt.exec('launchctl start com.tailscale.tailscaled', {name: 'Start'}, function(error, stdout, stderr) {
//    console.log("start --->", stdout, error);
// });
