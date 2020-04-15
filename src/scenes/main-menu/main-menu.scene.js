import {trackScene} from 'Utils/debug.js'

import * as uiWidgets from 'phaser-ui-tools';
import {MenuButtonTS} from 'UI/style.js';

class MainMenu extends Phaser.Scene {

    constructor () {
        super('MainMenu');

        trackScene(this);
    }

    preload () {
        this.load.setPath('main-menu/');

        this.load.image('background', 'sky.png');
        this.load.spritesheet('button', 'button.png', { frameWidth: 128, frameHeight: 48 });
        this.load.image('header', 'header.png')
    }  

    create () {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.header = new uiWidgets.TextSprite(this, 0, 0, "header").setText('WHACK EM', MenuButtonTS).setOrigin(0,0);

        var playButton = new uiWidgets.TextButton(this, 0, 0, 'button', loadGame, this, 1, 0, 2, 1)
        .setText("Play", MenuButtonTS)
        .eventTextYAdjustment(3);

        var column = new uiWidgets.Column(this, 400, 400);
        column.addNode(playButton, 0, 10);
    }
}

function loadGame(){
    this.scene.start('Battle');
}

export default MainMenu;