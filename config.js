//-------------------------------------------
// Config initialization
//-------------------------------------------
let config = {};
config.plex = {};
config.neeo = {};

// KODI Settings

config.plex.ip = '10.0.0.123';               // Set the IP address of Plex
config.plex.client = '10.0.0.173';              // Set the client to control

// NEEO Settings

config.neeo.brainIp = '';                         // Set the IP address of the NEEO Brain, or leave empty to auto discover
                                                  // Note: Auto discover the NEEO brain did not work always for me
config.neeo.port = 6336;                          // Set the local TCP port for the NEEO REST-WebService

//-------------------------------------------
module.exports = config;