const {tryCreateDaemonPlist, tryUnLoadDaemonPlist , tryStartDaemon, tryLoadDaemonPlist, tryStopDaemon} = require("./daemon");
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
    if (plist.success) {
        await tryStopDaemon(tailscaledPackageName);
        // await tryStartDaemon(tailscaledPackageName);
        await tryUnLoadDaemonPlist(tailscaledPlistPath);

        console.log("tailscaled stop and unloaded successfully");

        await tryLoadDaemonPlist(tailscaledPlistPath);
        const start = await tryStartDaemon(tailscaledPackageName);

        /**
         * XXX: The following method is not feasible,
         *      because TailScaled will withdraw immediately after starting,
         *      resulting in the unable to get Stdout...
         */
        if (start.success) {
            console.log("Tailscaled installed successfully");
        }
    }
}

start();