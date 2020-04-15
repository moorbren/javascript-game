import {sleep} from 'Utils/utils';


/**
 * Set's up some debug variables to make debugging scenes easier. 
 * 
 * Current scene is injected into the window.currentScene variable. 
 * 
 * @param {Phaser.Scene} sceneCtx 
 */
export function trackScene(sceneCtx){

    if(process.env.mode === "development"){
        window.currentScene = sceneCtx;

        var sceneKey = sceneCtx.__proto__.constructor.name;

        var controlPanels = document.querySelector('#control-panels');
        for(var x = 0; x < controlPanels.children.length; x++){ //hiding all control panels
            controlPanels.children[x].classList.add('hidden');
        }

        try{
            document.querySelector(`#debug-${sceneKey}`).classList.remove('hidden');
            console.log(`Control panel found for ${sceneKey}`)
        }catch(e){}

    
        console.log(`Changed to scene -> "${sceneKey}"`);
    }
}


/**
 * Clears cookie by setting it to expire at the dawn of time
 * 
 * @param {String} cookie 
 */
function clearCookie(cookie){
    document.cookie = `${cookie}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Extracts the value of a cookie based on the name. If non-existant, returns undefined
 * Snagged from the internet.
 * @param {*} name
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();

    return undefined;
}

/**
 * ============
 * Battle debug
 * ============
 */
function resetPlayerPos(){
    window.currentScene.player.setPosition(100, 400);
}

function toggleMute(){
    var isMute = getCookie('isMuted') === undefined ? false : true
    if(isMute){
        clearCookie('isMuted');
        window.currentScene.game.sound.setMute(false);
    }else{
        window.currentScene.game.sound.setMute(true);
        document.cookie = 'isMuted=true;'
    }
}

function initDebugMenus(){
    document.querySelector('#reset-player').addEventListener('click', resetPlayerPos);
    document.querySelector('#mute-game').addEventListener('click', toggleMute);
}

/**
 * Called by main
 */
export default function initDebug(){
    if(process.env.mode === "development"){
        var controlPanels = document.querySelector('#control-panels');
        for(var x = 0; x < controlPanels.children.length; x++){ //force hiding all control panels
            controlPanels.children[x].classList.add('hidden');
        }
    
        initDebugMenus();
    }

    window.addEventListener('DOMContentLoaded', async function(){
        var clone = document.querySelector('#control-table').cloneNode(true);
        document.querySelector('#control-table').remove();

        document.querySelector('body').appendChild(clone);

        await sleep(1000);
        
        if(process.env.mode === "development"){
            window.currentScene.game.sound.setMute(getCookie('isMuted') === undefined ? false : true);
        }
    });
}


