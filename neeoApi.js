'use strict';

const neeoapi = require('neeo-sdk');

function startServer(brain, listenPort, devices) {
    if (brain.name)
        console.log(`Starting NEEO API server and connect to NEEO Brain: ${brain.name}`);
    else
        console.log(`Starting NEEO API server and connect to NEEO Brain: ${brain}`);

    return neeoapi.startServer({
        brain,
        port: listenPort,
        name: 'custom-adapter',
        devices: devices
    })
        .then(() => {
            console.log('NEEO Api is ready and running!');
            console.log('');
            console.log('Use the NEEO app to search for "KODI" device.');
            console.log('');
        })
        .catch((error) => {
            //if there was any error, print message out to console
            console.error('ERROR!', error.message);
            process.exit(1);
        });
}

exports.initialize = function(listenPort, brainIp, devices) {
    if (brainIp) {
        return startServer(brainIp, listenPort, devices);
    } else {
        console.log('Discover one NEEO Brain...');
        return neeoapi.discoverOneBrain()
            .then((brain) => {
                console.log('NEEO Brain discovered:', brain.name);
                return startServer(brain, listenPort, devices);
            });
    }
}