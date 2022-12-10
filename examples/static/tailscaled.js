const {tryCreateDaemonPlist, tryUnLoadDaemonPlist , tryStartDaemon, tryLoadDaemonPlist} = require("./daemon");
const {content} = require("./plist");
const {execSync} = require("child_process");
const {lib} = require("../config/constant");

const tailscaledBinPath = "/usr/local/bin/tailscaled";
const tailscaledPlistPath = "/Library/LaunchDaemons/com.tailscale.tailscaled.plist";
const tailscaledPackageName = "com.tailscale.tailscaled";

function tryCopyTailScaledToBin() {
    try {
        const copyStdout = execSync(`cp ${lib}/tailscaled ${tailscaledBinPath}`);
        const chmodXStdout = execSync(`chmod +x ${tailscaledBinPath}`);
        return {
            success: true,
            stdout: {
                copyStdout,
                chmodXStdout
            },
            error: null
        };
    } catch (error) {
        return {
            success: false,
            stdout: null,
            error
        };
    }
}

async function start() {
    const copyResult = tryCopyTailScaledToBin();
    if (!copyResult.success) {
        console.error(copyResult.error);
        return;
    }

    const plist = await tryCreateDaemonPlist(content, tailscaledPlistPath);
    console.log("plist:", plist);
    if (plist.success) {
        await tryStartDaemon(tailscaledPackageName);
        await tryUnLoadDaemonPlist(tailscaledPlistPath);

        console.log("Tailscale uninstalled successfully");

        await tryLoadDaemonPlist(tailscaledPlistPath);
        const start = await tryStartDaemon(tailscaledPackageName);

        if (start.success) {
            console.log("Tailscale installed successfully");
        }
    }
}

start();