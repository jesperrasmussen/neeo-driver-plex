//-------------------------------------------
// Config initialization
//-------------------------------------------
let config = {};
config.kodi = {};
config.neeo = {};

// KODI Settings

config.kodi.ip = '192.168.178.131';               // Set the IP address of your KODI MediaCenter
config.kodi.port = 9090;                          // Set the Port of the JSON-RPC API (KODI default is 9090)
                                                  // IMPORTANT: It's *NOT* the Port of the KODI Webserver !!!
config.kodi.mac = 'B8:AE:ED:71:B0:21';            // Hardware (MAC) address of your KODI MediaCenter (option for Wake-On-LAN)
config.kodi.powerOff = 'shutdown';                // Power-OFF function:
                                                  //    NONE = No function
                                                  //    EXIT = Exit KODI Application
                                                  //    SHUTDOWN = Shutdown the Media PC
config.kodi.broadcastAddress = '192.168.178.255'; // Only needed for Wake-on-LAN and if you run this driver on Windows

// NEEO Settings

config.neeo.brainIp = '';                         // Set the IP address of the NEEO Brain, or leav empty to auto discover
config.neeo.port = 6336;                          // Set the local TCP port for the NEEO REST-WebService

//-------------------------------------------
module.exports = config;