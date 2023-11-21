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
        this.keys = this.input.keyboard.addKeys("w,a,s,d")
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
            key:"walkDown",
            frames:this.anims.generateFrameNumbers("player", {frames:[18,19,20,21,22,23]}),
            framerate:16,
            repeat:-1
        })
            this.anims.create({
            key:"idleRight",
            frames:this.anims.generateFrameNumbers("player", {frames:[24,25,26,27,28,29]}),
            framerate:16,
            repeat:-1
        })
        this.player = this.physics.add.sprite(110,110, "player")
    }

    update() 
    {

        this.player.setVelocity(0)

        if (this.keys.w.isDown)
        {
            this.player.setVelocityY(-100),
            this.player.setFlipX(false),
            this.player.play("idleUp",true),
            this.player.anims.msPerFrame = 100
        }

        if (this.keys.a.isDown)
        {
            this.player.setVelocityX(-100),
            this.player.setFlipX(true),
            this.player.play("idleRight",true),
            this.player.anims.msPerFrame = 100 
        }
        if (this.keys.s.isDown)
        {
            this.player.setVelocityY(100),
            this.player.setFlipX(false),
            this.player.play("idleDown",true),
            this.player.anims.msPerFrame = 100
        }
        if (this.keys.d.isDown)
        {
            this.player.setVelocityX(100),
            this.player.setFlipX(false),
            this.player.play("idleRight",true),
            this.player.anims.msPerFrame = 100
        }
        //else
        //{
          //  this.player.setVelocityY(0)
           // this.player.setVelocityX(0)
        //}
    }
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