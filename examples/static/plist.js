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

module.exports = {
    content: plist,
};