export default class PlayerController {

    /**
     * This creates a player and loads it into the current scene.
     * 
     * @param {*} sceneCtx The scene context to inject the player into. 
     */
    constructor(sceneCtx){
        this.player = undefined;
        this.scene = sceneCtx; 

        this.speed = 300;
        this.jumpSpeed = 420;
        this.bounce = 0;

        this.MAX_JUMPS = 2
        this.jumps = this.MAX_JUMPS;
        this.isRunning = false;
        this.runningMultiplier = 1.5;

        this.isSliding = false;
        this.drag = 800; //velocity degrades by 80% every update cycle
        this.slideDrag = 130; //if sliding, your velocity degrades much more slowly

        this.slideBind = 'A';
        this.jumpBind = 'UP';
    }

    /**
     * Loads the resources needed to use the character. 
     */
    loadPlayer(){
        this.scene.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
    }


    /**
     * Creates the player inside the given scene. 
     * 
     */
    createPlayer(){
        //need to set player in two places, in the player controller and in the scene. Both need references to the player GameObject
        var player = this.player = this.scene.player = this.scene.physics.add.sprite(100, 450, 'dude');

        this.scene.input.keyboard.on(`keydown_${this.slideBind}`, this.beginSlide, this);
        this.scene.input.keyboard.on(`keyup_${this.slideBind}`, this.endSlide, this);

        //this.scene.input.keyboard.on()

        player.setBounce(this.bounce);
        player.setCollideWorldBounds(true);
        player.setDrag(this.drag,0);
    
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * The function that updates the player during the update loop. 
     * 
     */
    updatePlayer() {
        var cursors = this.scene.input.keyboard.createCursorKeys();
        var player = this.player;
    
        if(cursors.shift.isDown){
            this.isRunning = true;
        }else{
            this.isRunning = false;
        }

        if(!this.isSliding){
            player.setDrag(this.drag, 0);
        }

        if (cursors.left.isDown && !this.isSliding) {
            var speed = this.speed;
            if(this.isRunning) speed *= this.runningMultiplier;

            player.setVelocityX(speed * -1);
    
            player.anims.play('left', true);

        } else if (cursors.right.isDown && !this.isSliding) {
            var speed = this.speed;
            if(this.isRunning) speed *= this.runningMultiplier;

            player.setVelocityX(speed);
    
            player.anims.play('right', true);
        } else {
            player.anims.play('turn');
        }
    
    
        if(player.body.touching.down){
            player.jumps = this.MAX_JUMPS;
        }
        
    
        if ((cursors.up.isDown || cursors.space.isDown) && player.jumps > 0) { 
            player.setVelocityY(this.jumpSpeed * -1);
            player.jumps -= 1;
        }
    }

    /**
     * Begins a slide when the player presses the slide bind. Gets called when the slide bind is pressed down (at start of sliding event). 
     */
    beginSlide(){
        console.log('slide began')
        if(!this.isSliding){
            this.player.setDrag(this.slideDrag, 0);

            this.isSliding = true;
        }
    }

    /**
     * Ends the current slide. Called when slide bind is released.
     */
    endSlide(){
        console.log('slide end')

        if(this.isSliding){
            this.player.setDrag(this.drag, 0);
            this.isSliding = false;
        }
    }

    jump(){

    }

}




