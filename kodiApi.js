'use strict';

// http://kodi.wiki/view/JSON-RPC_API/v8

const config = require('./config');
const kodi = require('kodi-ws')

let kodiConnection = null

let kodiIp = '';
let kodiPort = 9090;

let connected = false;
let autoReconnect = true;

function connect(reconnecting = false)
{
    if (connected)
    {
        console.log(`Already conneceted!`);
        return;
    }

    if (!reconnecting)
        console.log(`Try connecting KODI at ${kodiIp}:${kodiPort} ...`);

    return kodi(kodiIp, kodiPort)
        .then(function(connection) {
            kodiConnection = connection;

            // Try to re-connect on error
            kodiConnection.on('error', function() {
                connected = false;
                reconnect()
            })

            kodiConnection.on('close', function() {
                connected = false;
                //reconnect()
            })

            connected = true;
            console.log("KODI successfully connected.");
        })
        .catch((error) => {
            if (!reconnecting)
                console.error(error.message);
            reconnect()
        });
}

function reconnect() {
    if (!connected && autoReconnect) {
        setTimeout(function() {
            console.log(`Try re-connecting KODI at ${kodiIp}:${kodiPort} ...`);
            connect(true)
        }, 1000);
    }
}

function wake() {
    if (config.kodi.mac) {
        let options = {}

        // Important for windows
        if (config.kodi.broadcastAddress) {
            options.address = '192.168.178.255';
            options.port = 7;
        }

        let wol = require('node-wol');
        wol.wake(config.kodi.mac, options, function (error) {
            if (error) {
                console.error(error.message);
                return;
            }

            console.log('Wake-on-LAN package sent to: ' + config.kodi.mac);
        });
    }
};

exports.initialize = function(ip, port = 9090) {
    kodiIp = ip;
    kodiPort = port;

    autoReconnect = false;
    return connect(false)
};

exports.startApiService = function() {
    autoReconnect = true;
    wake();  // Try to start via wake-on-lan
    connect(false)
};

exports.stopApiService = function() {
    autoReconnect = false;

    if (connected) {
        if (config.kodi.powerOff.toUpperCase() == 'EXIT') {
            console.log('Exit KODI application.');
            kodiConnection.run('Application.Quit');
        }
        else if (config.kodi.powerOff.toUpperCase() == 'SHUTDOWN') {
            console.log('Shutdown KODI MediaPC.');
            kodiConnection.run('System.Shutdown');
        }
    }

    console.log('KODI API service stopped.');
};

exports.isConnected = function(method, args) {
    return connected;
};

/* ------------------------------------------------------------------------
 * Kodi control functions
 * ------------------------------------------------------------------------ */

exports.run = function(method, args) {
    return kodiConnection.run(method, args);
};

exports.play = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "play"})
};

exports.pause = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "pause"})
};

exports.stop = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "stop"})
};

exports.pageup = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "pageup"})
};

exports.pagedown = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "pagedown"})
};

exports.skipNext = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "skipnext"})
};

exports.skipPrevious = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "skipprevious"})
};

exports.stepForward = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "stepforward"})
};

exports.stepBack = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "stepback"})
};

exports.fastForward = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "fastforward"})
};

exports.rewind = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "rewind"})
};

exports.activateWindow = function(name) {
    return kodiConnection.run('GUI.ActivateWindow', { window: name });
};

