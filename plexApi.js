'use strict';

// http://kodi.wiki/view/JSON-RPC_API/v8

const config = require('./config');
const PlexControl = require("plex-control").PlexControl;

let control = null

let plexIp = '';
let plexClient = '';

let connected = false;
let autoReconnect = true;

function connect(reconnecting = false)
{
    if (connected)
    {
        console.log(`Already connected!`);
        return;
    }

    if (!reconnecting)
        console.log(`Trying to connect to Plex`);

    //These should be customizable
    control = new PlexControl(plexIp, 'RasPlex', {username: '<username>', password: '<password>'});
    control.setClient('RasPlex');
    //control.setClient('10.0.0.173');
    connected = true;
    console.log("Connected to Plex")
}

function reconnect() {
    if (!connected && autoReconnect) {
        setTimeout(function() {
            console.log(`Reinitializing connection`);
            connect(true)
        }, 1000);
    }
}

exports.initialize = function(ip, client) {
    plexIp = ip;
    plexClient = client;

    autoReconnect = false;
    return connect(false)
};

exports.startApiService = function() {
    autoReconnect = true;
    connect(false)
};

exports.stopApiService = function() {
    autoReconnect = false;

    if (connected) {
        //Maybe sleep?
        console.log('Still connected');
    }

    console.log('Closing connection to Plex');
};

exports.isConnected = function(method, args) {
    return connected;
};

exports.run = function(method, args) {
    if (connected)
        return control[method](args);
};

exports.executeNavigation = function(method, args) {
    console.log(connected);
    console.log(control);
    console.log('navigation ' + method);
    if (connected) {
        control.navigation[method](args).then(function () {
            console.log('success ' + method)
        }, function (err) {
            console.err('Error while communicating with HTTP API', err);
        });
    }
}

exports.playback = function(method, args) {
    console.log(connected);
    console.log(control);
    console.log('playback ' + method);
    if (connected) {
        control.playback[method](args).then(function(){
            console.log('success ' + method)
        }, function(err){
            console.err('Error while communicating with HTTP API', err);
        });
    }
}

