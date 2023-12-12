import './style.css'
import Phaser from 'phaser'
import {Player} from './player.js'
import { Entity } from './entity.js'
import {Slime} from './slime.js'
var playerDirection
var battle = false
var battle2 = false
var battle3 = false
var slimeAlive = true

const Sizes = {
    width: 960,
    height: 640
}

class battleScene extends Phaser.Scene{
    constructor(){
        super("scene-battle")
    }
    preload()
    {
        this.load.image("map2", "assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
    }
    create()
    {
      const slime = new Slime();
      const player = new Player("name", 50, 100, 50, 1);
      console.log(slime.health)
      this.map = this.add.image(0,0,"map2").setOrigin(0,0)
      
      const AttackButton = this.add.text(500,100,"Attack").setInteractive().on('pointerdown', () => this.AttackButtonClicked(slime, player))

      
      const ItemButton = this.add.text(100,100,"Item")//.setInteractive().on('pointerdown', () => this.battle())

      
        const RunButton = this.add.text(100,100,"Run")//.setInteractive().on('pointerdown', () => this.battle())
        this.anims.create({
            key:"slimeDie",
            frames:this.anims.generateFrameNumbers("slime", {frames:[28,29,30,31, 32]}),
            framerate:16,
            repeat:0
        })
        this.slime = this.add.sprite(700,200, "slime")
        this.player = this.add.sprite(300,200, "player")
        this.player.play("idleRight", true)
        this.player.anims.msPerFrame = 100
        this.slime.setFlipX(true)
        this.slime.play("idle", true)
        this.slime.anims.msPerFrame = 100
    }
    AttackButtonClicked(slime, player)
    {
        slime.health = slime.health - player.attack;
        console.log(slime.health);
        this.player.play("attackRight", 4,false)
        this.player.anims.msPerFrame = 100
        if(slime.health <= 0 && slimeAlive)
        {
            slimeAlive = false
            this.slime.play("slimeDie", false)
            this.slime.anims.msPerFrame = 200
            this.add.text(500,200,"You Won The Battle");
            this.add.text(500, 250, "Leave").setInteractive().on('pointerdown', () => this.leaveScene())
        //    this.scene.switch("scene-game");
        }
        else if(player.health <= 0)
        {
            this.add.text(500,200, "You Lost The Battle")
            battle = false
            this.scene.switch("scene-game")
        }
    }
    leaveScene()
    {
        this.scene.switch("scene-game")
    }
    update()
    {

    }
}


class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.slime
    }

    preload() {
        this.load.image("map", "assets/map.png")
        this.load.spritesheet("player", "assets/sprites/characters/player.png",
        {
        frameWidth:48,
        frameHeight:48
        })
        this.load.spritesheet("slime", "assets/sprites/characters/slime.png",
        {
            frameWidth:32,
            frameHeight:32
        })
    }

    create() {
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f")
        this.map = this.add.image(0, 0, "map").setOrigin(0, 0)
        const button = this.add.text(100,100,"battle").setInteractive().on('pointerdown', () => this.battle())

       this.anims.create({
            key:"idle",
            frames:this.anims.generateFrameNumbers("slime", {frames:[0,1,2,3]}),
            frameRate:16,
            repeat:-1
        })
        this.anims.create({
            key:"mediumJump",
            frames:this.anims.generateFrameNumbers("slime", {frames:[7,8,9,10,11,12]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"longJump",
            frames:this.anims.generateFrameNumbers("slime", {frames:[14,15,16,17,18,19,20]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"shortJump",
            frames:this.anims.generateFrameNumbers("slime", {frames:[21,22,23]}),
            framerate:16,
            repeat:-1
        })
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
            key:"walkRight",
            frames:this.anims.generateFrameNumbers("player", {frames:[24,25,26,27,28,29]}),
            framerate:16,
            repeat:-1
        })
            this.anims.create({
            key:"walkUp",
            frames:this.anims.generateFrameNumbers("player", {frames:[30,31,32,33,34,35]}),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"attackDown",
            frames:this.anims.generateFrameNumbers("player", {frames:[36,37,38,39]}),
            framerate:16,
        })
        this.anims.create({
            key:"attackRight",
            frames:this.anims.generateFrameNumbers("player", {frames:[42,43,44,45]}),
            framerate:16,
        })
        this.anims.create({
            key:"attackUp",
            frames:this.anims.generateFrameNumbers("player", {frames:[48,49,50,51]}),
            framerate:16,
        })
        this.player = this.physics.add.sprite(110,110, "player")
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 100
        this.slime = this.physics.add.sprite(200,200, "slime")
        this.slime.play("idle", true)
        this.slime.anims.msPerFrame = 150
        this.physics.add.collider(this.player, this.slime)
        this.slime.body.setSize(10,10)
        this.player.body.setSize(16,24)
        this.slime.setImmovable(false)
        this.slime.setBounce(50,50)
        this.slime.setCollideWorldBounds(true)
        this.player.setCollideWorldBounds(true)
   
    }
    battle()
    {
        if (battle == false)
        {
            console.log("battle")
            battle = true
            const player1 = new Player("Name", 50, 100, 50, 1)
            console.log(player1.attack)
            this.scene.start("scene-battle")
        }
    }
    update() 
    {
        this.player.setVelocity(0)
        this.player.setBodySize(16,20)
        this.player.setOffset(16,20)
        this.physics.add.overlap(this.slime, this.player, this.battle, undefined, this)
        if(this.keys.s.isDown && this.keys.a.isDown)
        {
            this.player.setVelocityY(69.4)
            this.player.setVelocityX(-69.4)
        }
        else if(this.keys.s.isDown && this.keys.d.isDown)
        {
            this.player.setVelocityY(69.4)
            this.player.setVelocityX(69.4)
        }
        else if (playerDirection == "s" && this.keys.f.isDown)
        {
            this.player.setFlipX(false)
            this.player.body.setSize(16,24)
            this.player.setOffset(16,30)
            this.player.play("attackDown",true)
            this.player.anims.msPerFrame = 100
        }
        else if (this.keys.s.isDown)
        {
            playerDirection = "s",
            this.player.setVelocityY(100),
            this.player.setFlipX(false),
            this.player.play("walkDown",true),
            this.player.anims.msPerFrame = 100
        }
        else if(playerDirection == "s")
        {
            this.player.play("idleDown", true)
            this.player.anims.msPerFrame = 100
        }
        if(this.keys.w.isDown && this.keys.a.isDown)
        {
            this.player.setVelocityY(-69.4)
            this.player.setVelocityX(-69.4)
        }
        else if(this.keys.w.isDown && this.keys.d.isDown)
        {
            this.player.setVelocityY(-69.4)
            this.player.setVelocityX(69.4)
        }
        else if (playerDirection == "w" && this.keys.f.isDown)
        {
            this.player.setFlipX(false)
            this.player.body.setSize(16,25)
            this.player.play("attackUp",true)
            this.player.anims.msPerFrame = 100
        }
        else if (this.keys.w.isDown)
        {
            playerDirection = "w",
            this.player.setVelocityY(-100),
            this.player.setFlipX(false),
            this.player.play("walkUp",true),
            this.player.anims.msPerFrame = 100
        }
        else if(playerDirection == "w")
        {
            this.player.play("idleUp", true)
            this.player.anims.msPerFrame = 100
        }

        if (playerDirection == "a" && this.keys.f.isDown)
        {
            this.player.setFlipX(true)
            this.player.body.setSize(35,20)
            this.player.setOffset(0,20)
            this.player.play("attackRight",true)
            this.player.anims.msPerFrame = 100
        }
        else if (this.keys.a.isDown)
        {
            playerDirection = "a",
            this.player.setVelocityX(-100),
            this.player.setFlipX(true),
            this.player.play("walkRight",true),
            this.player.anims.msPerFrame = 100 
        }
        else if(playerDirection == "a")
        {
            this.player.play("idleRight", true)
            this.player.anims.msPerFrame = 100  
        }
        if (playerDirection == "d" && this.keys.f.isDown)
        {
            this.player.setFlipX(false)
            this.player.body.setSize(35,20)
            this.player.setOffset(15,20)
            this.player.play("attackRight",true)
            this.player.anims.msPerFrame = 100
        }
        else if (this.keys.d.isDown)
        {
            playerDirection = "d"
            this.player.setVelocityX(100),
            this.player.setFlipX(false),
            this.player.play("walkRight",true),
            this.player.anims.msPerFrame = 100
        }
        else if(playerDirection == "d")
        {
            this.player.play("idleRight", true)
            this.player.anims.msPerFrame = 100
        }
        if(battle == true)
        {
            this.slime.destroy(true);
        }
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
            debug:true
        }
    },

    scene: [GameScene, battleScene]
}
const game = new Phaser.Game(config)