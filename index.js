'use strict';

/* -------------------------------------------------------------
 *
 * NEEO Driver for KODI
 *
 * https://github.com/alxbauer/neeo-driver-kodi
 *
 * All configuration is done in config.js file
 *
 * ------------------------------------------------------------- */

const config = require('./config');
const kodi = require('./kodiApi');
const neeoApi = require('./neeoApi');
const kodiDevice = require('./kodiDevice');

console.log('----------------------------------');
console.log('NEEO driver for KODI');
console.log('----------------------------------');

neeoApi.initialize(config.neeo.port, config.neeo.brainIp, [ kodiDevice ])
    .then(() =>{

        kodi.initialize(config.kodi.ip, config.kodi.port);
    });

