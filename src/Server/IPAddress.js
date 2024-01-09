const { networkInterfaces } = require('os');

export const getIPAddress = () => {
    const nets = networkInterfaces();
    let results={};

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Retrieve only IPv4 addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    // Return the first IP address for the first NIC found
    const nicNames = Object.keys(results);
    if (nicNames.length > 0) {
        const firstNICAddresses = results[nicNames[0]];
        if (firstNICAddresses.length > 0) {
            return firstNICAddresses[0];
        }
    }

    // No IP address found
    return null;
};
