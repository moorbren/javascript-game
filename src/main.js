import * as Phaser from 'phaser'

import MainMenu from './scenes/main-menu/main-menu.scene.js';
import Battle from './scenes/battle/battle.scene.js';
import initDebug from './utils/debug.js';

process.env.mode = "development"

var config = {
    type: Phaser.AUTO, //tries WebGL first, and switches to canvas rendering if it fails to grab WebGL context
    width: 1200,
    height: 800,
    antialias: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },

    //list of scenes availiable for the game to load
    scene: [MainMenu, Battle]
};

var GAME = new Phaser.Game(config);
export default GAME;

//loads main menu which takes care of alternate scene loads

initDebug();