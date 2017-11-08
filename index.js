'use strict';

/* -------------------------------------------------------------
 *
 * NEEO Driver for Plex
 *
 * https://github.com/jesperrasmussen/neeo-driver-plex
 *
 * All configuration is done in config.js file
 *
 * ------------------------------------------------------------- */

const config = require('./config');
const plex = require('./plexApi');
const neeoApi = require('./neeoApi');
const plexDevice = require('./plexDevice');

console.log('----------------------------------');
console.log('NEEO driver for Plex');
console.log('----------------------------------');

neeoApi.initialize(config.neeo.port, config.neeo.brainIp, [ plexDevice ])
    .then(() =>{
        plex.initialize(config.plex.ip, config.plex.client);
    });

