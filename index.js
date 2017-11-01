'use strict';

//-------------------------------------------------------------
// Settings
//-------------------------------------------------------------

// IP of your KODI MediaCenter.
const kodiIp     = '192.168.178.215';

// Port of your KODI MediaCenter. Default is 9090
const kodiPort   = 9090;

// IP of your NEEO Brain or leave empty to auto discover the NEEO Brain.
const brainIp    = '192.168.178.150';

// Listening port for this NEEO device driver.
const listenPort = 6336;

//-------------------------------------------------------------

const kodi = require('./kodiApi');
const neeoApi = require('./neeoApi');
const kodiDevice = require('./kodiDevice');

console.log('----------------------------------');
console.log('NEEO driver for KODI');
console.log('----------------------------------');

neeoApi.initialize(listenPort, brainIp, [ kodiDevice ])
    .then(() =>{

        kodi.initialize(kodiIp, kodiPort);
    });

