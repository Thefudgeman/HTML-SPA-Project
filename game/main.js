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
        this.load.image("player", "assets/sprites/player.png")
    }

    create() {
        this.add.image(0, 0, "map").setOrigin(0, 0)
        this.plaer = this.physics.add.image(0,0, "player").setOrigin(400, 300)
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