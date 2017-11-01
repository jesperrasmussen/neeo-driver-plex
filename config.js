//-------------------------------------------
// Config initialization
//-------------------------------------------
let config = {};
config.kodi = {};
config.neeo = {};

// KODI Settings

config.kodi.ip = '192.168.178.215';     // Set the IP address of your KODI MediaCenter
config.kodi.port = 9090;                // Set the Port of the JSON-RPC API (KODI default is 9090)
                                        // IMPORTANT: It's *NOT* the Port of the KODI Webserver !!!

// NEEO Settings

config.neeo.brainIp = '';               // Set the IP address of the NEEO Brain, or leav empty to auto discover
config.neeo.port = 6336;                // Set the local TCP port for the NEEO REST-WebService

//-------------------------------------------
module.exports = config;