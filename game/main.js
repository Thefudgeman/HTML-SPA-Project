import './style.css'
import Phaser from 'phaser'

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
        this.load.spritesheet("player", "assets/sprites/characters/player.png",
        {
        frameWidth:48,
        frameHeight:48
        })
    }

    create() {
        this.add.image(0, 0, "map").setOrigin(0, 0)
        //this.player = this.physics.add.image(0,0, "player").setOrigin(0,0)
        this.anims.create({
            key:"idleDown",
            frames:this.anims.generateFrameNumbers("player", {frames:[0,1,2,3,4,5]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"idleRight",
            frames:this.anims.generateFrameNumbers("player", {frames:[6,7,8,9,10,11]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"idleUp",
            frames:this.anims.generateFrameNumbers("player", {frames:[12,13,14,15,16,17]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"idleLeft",
            frames:this.anims.generateFrameNumbers("player", {frames:[6,7,8,9,10,11]}),
            framerate:16,
            repeat:-1
        })
        this.player = this.add.sprite(110,110, "player")
        this.player.setFlipX(true)
        this.player.play("idleLeft",true)
        this.player.anims.msPerFrame=100
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