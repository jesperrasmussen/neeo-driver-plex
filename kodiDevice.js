'use strict';

const neeoapi = require('neeo-sdk');
const kodi = require('./kodiApi');

const controller = {
    onButtonPressed: function onButtonPressed(name) {
        console.log(`[CONTROLLER] ${name} button pressed`);

        switch(name)
        {
            // Power
            case "POWER ON":          kodi.startApiService(); break;
            case "POWER OFF":         kodi.stopApiService(); break;
            // Navigation
            case "CURSOR UP":         kodi.run('Input.Up'); break;
            case "CURSOR DOWN":       kodi.run('Input.Down'); break;
            case "CURSOR LEFT":       kodi.run('Input.Left'); break;
            case "CURSOR RIGHT":      kodi.run('Input.Right'); break;
            case "CURSOR ENTER":      kodi.run('Input.Select'); break;
            case "PAGE UP":           kodi.pageup(); break;
            case "PAGE DOWN":         kodi.pagedown(); break;
            case "HOME":              kodi.run('Input.Home'); break;
            case "BACK":              kodi.run('Input.Back'); break;
            case "MENU":              kodi.run('Input.ContextMenu'); break;
            case "INFO":              kodi.run('Input.Info'); break;
            // Transport
            case "PLAY":              kodi.play(); break;
            case "PAUSE":             kodi.pause(); break;
            case "STOP":              kodi.stop(); break;
            case "NEXT":              kodi.skipNext(); break;
            case "PREVIOUS":          kodi.skipPrevious(); break;
            //case "FORWARD":           kodi.stepForward(); break;
            //case "REVERSE":           kodi.stepBack(); break;
            case "FORWARD":           kodi.fastForward(); break;
            case "REVERSE":           kodi.rewind(); break;
            // Shortcuts
            case "MY VIDEOS":         kodi.activateWindow('videos'); break;
            case "LIVE TV":           kodi.activateWindow('tvchannels'); break;
            case "MY MUSIC":          kodi.activateWindow('music'); break;

            default:
                console.log(`Unhandled button ${name} pressed`);
        }
    }
};

const kodiDevice = neeoapi.buildDevice('MediaCenter')
    .setManufacturer('KODI')
    .addAdditionalSearchToken('xbmc')
    .setType('MEDIAPLAYER')

    // Add the capabilities of the device
    // https://planet.neeo.com/t/k9tnlp#capability-names-button-names

    .addButton({ name: 'INFO', label: 'Info' })
    .addButton({ name: 'GUIDE', label: 'Guide' })
    .addButton({ name: 'PAGE UP', label: 'Page up' })
    .addButton({ name: 'PAGE DOWN', label: 'Page down' })
    .addButton({ name: 'HOME', label: 'Home' })
    .addButton({ name: 'MY MUSIC', label: 'Music' })
    .addButton({ name: 'MY VIDEOS', label: 'Movies' })
    .addButton({ name: 'LIVE TV', label: 'Live TV' })
    .addButton({ name: 'EXIT', label: 'Exit' })

    .addButtonGroup('Power')
    .addButtonGroup('Volume')
    .addButtonGroup('Menu and Back')
    .addButtonGroup('Controlpad')
    .addButtonGroup('Channel Zapper')
    .addButtonGroup('Transport')
    .addButtonGroup('Transport Search')
    .addButtonGroup('Transport Scan')
    .addButtonGroup('Transport Skip')
    .addButtonGroup('Language')

    .addButtonHander(controller.onButtonPressed);

module.exports = kodiDevice;
