'use strict';

const neeoapi = require('neeo-sdk');
const kodiDevice = require('./kodiDevice');

let driverPort;

function startServer(brain) {
    if (brain.name)
        console.log(`Starting NEEO API server and connect to NEEO Brain: ${brain.name}`);
    else
        console.log(`Starting NEEO API server and connect to NEEO Brain: ${brain}`);

    neeoapi.startServer({
        brain,
        port: driverPort,
        name: 'custom-adapter',
        devices: [kodiDevice]
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

exports.initialize = function(listenPort, brainIp = '') {
    driverPort = listenPort;

    if (brainIp) {
        startServer(brainIp);
    } else {
        console.log('Discover one NEEO Brain...');
        neeoapi.discoverOneBrain()
            .then((brain) => {
                console.log('NEEO Brain discovered:', brain.name);
                startServer(brain);
            });
    }
}