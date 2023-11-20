import './style.css'
import Phaser from 'phaser'
let spriteData;
let animation = [];
let playerC;

const Sizes = {
    width: 960,
    height: 640
}


class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
    }

    preload() {
        this.load.image("map", "assets/map.png")
        this.load.spritesheet("player", "assets/sprites/characters/player.png")
        frameWidth:48
        frameHeight:48
    }

    setup()
    {
        let frames = spriteData.frames  
        for(let i = 0; i <frames.length; i++) 
        {
            let pos = frames[i].position
            let img = spriteSheet.get(pos.x, pos.y, pos.w, pos.h)
            animation[i] = img
        }
            playerC = new sprite(animation, 1)
    }


    create() {
        this.add.image(0, 0, "map").setOrigin(0, 0)
        //this.player = this.physics.add.image(0,0, "player").setOrigin(0,0)
        this.add.image(0,0, animation[10])
        playerC.animate()
        playerC.show()
    }

    update() {}
}

const config = {
    type: Phaser.WEBGL,
    width: Sizes.width,
    height: Sizes.height,
    canvas: gameCanvas,
    physics:
    {
        default:"arcade",
        arcade:
        {
            gravity:{y:0},
            debug:false
        }
    },

    scene: [GameScene]
}
const game = new Phaser.Game(config)