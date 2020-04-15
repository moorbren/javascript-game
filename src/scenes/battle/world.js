import EventDirector from './event-director'

export default class WorldController {

    /**
     * This loads the game world into the current scene. 
     * 
     * @param {Phaser.Scene} sceneCtx The scene the world will load itself into. 
     */
    constructor(sceneCtx){
        this.blockSize = 32; //32x32 pixels
        this.width = this.blockSize*50;
        this.height = 600;
        this.scene = sceneCtx;

        this.EventDirector = new EventDirector(sceneCtx);
    }

    /**
     * Loads the assets needed to create the game world. 
     * 
     * @param {Phaser.Scene} sceneCtx 
     */
    loadWorld(){
        this.scene.load.image('grass', 'grass.png', {displayWidth: 32, displayHeight: 32});
        this.scene.load.image('brick', 'brick.png', {displayWidth: 32, displayHeight: 32});
        this.scene.load.image('idol1', 'cashKid.png', {width: 500, height: 500});
        this.scene.load.image('idol2', 'cashKid2.png', {width: 500, height: 500});
        this.scene.load.atlas('flares', 'particles/flares.png', 'particles/flares.json');

        this.EventDirector.load();
    }

    /**
     * Set's up the world. 
     * 
     */
    createWorld(){
        this.scene.physics.world.setBounds(0, 0, this.width, this.height);

        this.EventDirector.startMusic();
        this.genWorld();
    }


    updateWorld(){
        this.EventDirector.update();
    }


    /**
     * Places idols onto the map at fair points (coming soon). 
     */
    placeIdols(){ 
        var idolLeft = this.scene.physics.add.sprite(200, 300, 'idol1').setDisplaySize(128,128);
        var idolRight = this.scene.physics.add.sprite(this.width - 400, 300, 'idol2').setDisplaySize(128,128);

        var particles = this.scene.add.particles('flares');
        particles.createEmitter({
            frame: 'red',
            x: idolLeft.getTopCenter().x,
            y: idolLeft.getTopCenter().y,
            lifespan: 2000,
            speed: { min: 400, max: 600 },
            angle: 90,
            gravityY: 0,
            scale: { start: 0.4, end: 0 },
            quantity: 2,
            blendMode: 'ADD'
        });


        this.scene.physics.add.collider(this.scene.ground, idolLeft);
        this.scene.physics.add.collider(this.scene.ground, idolRight);
    }


    /**
     * Creates the platforms needed for people to run and jump on. 
     */
    genWorld(){
        var blocksX = Math.floor(this.width/this.blockSize);
        if(blocksX * this.blockSize < this.width) blocksX++; //ensuring that there will always be blocks til the very edge.

        //placing ground at bottom edge
        var ground = this.scene.ground = this.scene.physics.add.staticGroup();
        for(var x = 0 ; x < blocksX; x++){
            ground.create(x * this.blockSize + Math.floor(this.blockSize/2), this.height, 'grass')
        }

        //creating some brick platforms to jump on
        for(var i = 0; i < 30; i++){
            var randX = Math.floor((Math.random() * this.width));
            randX -= randX % this.blockSize; //clamping rand position to the block grid

            var randY = Math.floor((Math.random() * this.height));
            randY -= randY % this.blockSize; //clamping rand position to the block grid

            var brickAmt = Math.floor(Math.random() * 3 + 4); //4,7 bricks

            for(var j = 0; j < brickAmt; j++){
                ground.create(Math.floor(randX + j * this.blockSize - this.blockSize/2), Math.floor(randY - this.blockSize/2), 'brick');
            }
        }

        this.placeIdols();
    }
}
