# NEEO driver for KODI
This driver adds support for KODI MediaCenter to NEEO

* NEEO - The Thinking Remote: https://neeo.com
* KODI MediaCenter: https://kodi.tv

## Requirements
* Node.js (https://nodejs.org)

## How to install
 Download or clone the git code.
```
git clone https://github.com/alxbauer/neeo-driver-kodi.git
```
Install required packages with npm
```
npm install
```
**Edit the config.js file to adjust the settings** 

Start the driver
```
node index.js 
```

## Features
* Power on the MediaPC via Wake-on-LAN
* Optional exit KODI or shutdown the MediaPC on poweroff
* Auto reconnect KODI, if connection was lost

## Available control function
* Power on / off
* Navigation with control pad
* Page up / down
* Skip next / previous
* Fast forward / rewind
* Home / Menu / Info
* Shortcuts for My Videos / Live Tv / My Music

## Changelog

## Version 0.1.0
- Initial release