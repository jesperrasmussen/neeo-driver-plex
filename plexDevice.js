'use strict';

const neeoapi = require('neeo-sdk');
const plex = require('./plexApi');

const controller = {
    onButtonPressed: function onButtonPressed(name) {
        console.log(`[CONTROLLER] ${name} button pressed`);

        switch(name)
        {
            // Power
            case "POWER ON":          plex.startApiService(); break;
            case "POWER OFF":         plex.stopApiService(); break;
            // Navigation
            case "CURSOR UP":         plex.executeNavigation('moveUp'); break;
            case "CURSOR DOWN":       plex.executeNavigation('moveDown'); break;
            case "CURSOR LEFT":       plex.executeNavigation('moveLeft'); break;
            case "CURSOR RIGHT":      plex.executeNavigation('moveRight'); break;
            case "CURSOR ENTER":      plex.executeNavigation('select'); break;
            case "PAGE UP":           plex.executeNavigation('pageUp'); break;
            case "PAGE DOWN":         plex.executeNavigation('pageDown'); break;
            case "HOME":              plex.run('Input.Home'); break;
            case "BACK":              plex.executeNavigation('back'); break;
            case "MENU":              plex.executeNavigation('contextMenu'); break;
            case "INFO":              plex.executeNavigation('toggleOSD'); break;
            // Transport
            case "PLAY":              plex.playback('play'); break;
            case "PAUSE":             plex.playback('pause'); break;
            case "STOP":              plex.playback('stop'); break;
            case "NEXT":              plex.playback('skipNext'); break;
            case "PREVIOUS":          plex.playback('skipPrevious'); break;
            //case "FORWARD":           kodi.stepForward(); break;
            //case "REVERSE":           kodi.stepBack(); break;
            case "FORWARD":           plex.playback('fastForward'); break;
            case "REVERSE":           plex.playback('rewind'); break;
            // Shortcuts
            //case "MY VIDEOS":         plex.activateWindow('videos'); break;
            //case "LIVE TV":           plex.activateWindow('tvchannels'); break;
            //case "MY MUSIC":          plex.activateWindow('music'); break;

            default:
                console.log(`Unhandled button ${name} pressed`);
        }
    }
};

const plexDevice = neeoapi.buildDevice('PlexAwesome')
    .setManufacturer('Plex')
    .addAdditionalSearchToken('plex')
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

module.exports = plexDevice;
