

export default class EventDirector {
    
    /**
     * 
     * @param {Phaser.Scene} sceneCtx 
     */
    constructor(sceneCtx){
        this.scene = sceneCtx;
        this.specialEventTiming = 60; //60 seconds per special event

        this.songCount = 4;
        this.currentSongIndex = Math.floor(Math.random() * this.songCount); //random song between 0 and max songs
        this.currentSong;
    }

    /**
     * Loads assets needed to run the game.
     * 
     * @param {Phaser.Scene} sceneCtx 
     */
    load(){
        for(var x = 0; x < this.songCount; x++){
            this.scene.load.audio('t' + (x+1), 'music/t' + (x+1) + '.mp3');
        }
    }

    startMusic(){
        this.currentSong = this.scene.sound.add('t' + (this.currentSongIndex+1));
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songCount; //updating currentSong index to the next one in the list
        this.currentSong.once('complete', function(){
            startMusic();
        });
    }

    unpauseMusic(){
        this.currentSong.play();
    }

    pauseMusic(){
        this.currentSong.pause();
    }

    update(){
        
    }

    
}