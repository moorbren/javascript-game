import {trackScene} from "Utils/debug.js";

import PlayerController from './player';
import WorldController from './world';
import {loadWorld, createWorld} from './world';

class Battle extends Phaser.Scene {

    constructor () {
        super('Battle');

        trackScene(this); //'this' isn't actually the full scene, it doesn't appear to fully load the scene itself in the constructor
    }

    preload () {
        this.load.setPath('battle/');
        this.load.image('sky', 'sky.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');

        this.WorldController = new WorldController(this);
        this.PlayerController = new PlayerController(this);

        this.WorldController.loadWorld();
        this.PlayerController.loadPlayer();
    }  

    create () {
        this.add.image(0, 0, 'sky').setOrigin(0,0); //the background

        this.WorldController.createWorld();
        this.PlayerController.createPlayer(); //loads the player object into this scene

        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
    }

    update (){
        this.PlayerController.updatePlayer();
        this.WorldController.updateWorld();
    }
}

export default Battle;