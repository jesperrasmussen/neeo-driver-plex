# NEEO driver for Plex
This driver adds support for Plex to NEEO

* NEEO - The Thinking Remote: https://neeo.com
* Plex: https://plex.tv

This project was originally based on Alexanders [Kodi implementation](https://github.com/alxbauer/neeo-driver-kodi), and adjusted to use Plex-control to communicate with Plex Media Server / client through their HTTP API. I've added a few patches to the plex-control and plex-api Node modules needed, to add support for recent PMS builds.

Keep in mind this is work in progress, until Neeo get their own, proper Plex implementation up and running.

## Available control function
* Power on / off
* Navigation with control pad
* Page up / down
* Skip next / previous
* Fast forward / rewind
* Home / Menu / Info

## Requirements
* Node.js (https://nodejs.org)

## Installation

Install required packages with npm
```
npm install
```
**Edit the config.js file to adjust the settings, the primary things you'd want to change are Plex server IP as well as the name of the client you're trying to control**

Start the driver
```
node index.js 
```

## Changelog

## Version 0.1.0
- Initial release