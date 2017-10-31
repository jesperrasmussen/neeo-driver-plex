'use strict';

// http://kodi.wiki/view/JSON-RPC_API/v8

let kodi = require('kodi-ws')
let kodiConnection = null

exports.connect = function(ip, port = 9090) {
    console.log(`Connecting KODI at ${ip}:${port} ...`);
    return kodi(ip, port).then(function(connection) {
        kodiConnection = connection;
        console.log("KODI successfully connected.");
    });
};

exports.run = function(method, args) {
    return kodiConnection.run(method, args);
};

exports.play = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "play"})
};

exports.pause = function() {
    kodiConnection.run('Input.ExecuteAction', { action: "pause"})
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

exports.playPause = function() {
    kodiConnection.run('Player.GetActivePlayers').then(function(data) {
       let player = data[0];
       console.dir(player);

       kodiConnection.Player.PlayPause({ playerid: player.playerid });
    });
};

exports.stop = function() {
    kodiConnection.run('Player.GetActivePlayers').then(function(data) {
        let player = data[0];
        console.dir(player);

        kodiConnection.Player.Stop({ playerid: player.playerid });
    });
};

exports.activateWindow = function(name) {
    return kodiConnection.run('GUI.ActivateWindow', { window: name });
};

