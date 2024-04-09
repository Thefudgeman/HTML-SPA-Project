import { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms"

var playerDirection
export class variables
{
    battle = false
    battle2 = false
    battle3 = false
    money = 999999999999999
    opendoors = false
    highestFloorClear = 0
    currentFloor = 1
}


export var Variables = new variables()

var createAnims = false
var playerX = 110
var playerY = 110


class BaseScene extends Phaser.Scene{
    movement(player, keys)
    {
        player.setVelocity(0)
        player.setBodySize(16,20)
        player.setOffset(16,20)
        if(keys.s.isDown && keys.a.isDown)
        {
            player.setVelocityY(69.4)
            player.setVelocityX(-69.4)
        }
        else if(keys.s.isDown && keys.d.isDown)
        {
            player.setVelocityY(69.4)
            player.setVelocityX(69.4)
        }
        else if (playerDirection == "s" && keys.f.isDown)
        {
            player.setFlipX(false)
            player.body.setSize(16,24)
            player.setOffset(16,30)
            player.play("attackDown",true)
            player.anims.msPerFrame = 100
        }
        else if (keys.s.isDown)
        {
            playerDirection = "s",
            player.setVelocityY(100),
            player.setFlipX(false),
            player.play("walkDown",true),
            player.anims.msPerFrame = 100
        }
        else if(playerDirection == "s")
        {
            player.play("idleDown", true)
            player.anims.msPerFrame = 100
        }
        if(keys.w.isDown && keys.a.isDown)
        {
            player.setVelocityY(-69.4)
            player.setVelocityX(-69.4)
        }
        else if(keys.w.isDown && keys.d.isDown)
        {
            player.setVelocityY(-69.4)
            player.setVelocityX(69.4)
        }
        else if (playerDirection == "w" && keys.f.isDown)
        {
            player.setFlipX(false)
            player.body.setSize(16,25)
            player.play("attackUp",true)
            player.anims.msPerFrame = 100
        }
        else if (keys.w.isDown)
        {
            playerDirection = "w",
            player.setVelocityY(-100),
            player.setFlipX(false),
            player.play("walkUp",true),
            player.anims.msPerFrame = 100
        }
        else if(playerDirection == "w")
        {
            player.play("idleUp", true)
            player.anims.msPerFrame = 100
        }

        if (playerDirection == "a" && keys.f.isDown)
        {
            player.setFlipX(true)
            player.body.setSize(35,20)
            player.setOffset(0,20)
            player.play("attackRight",true)
            player.anims.msPerFrame = 100
        }
        else if (keys.a.isDown)
        {
            playerDirection = "a",
            player.setVelocityX(-100),
            player.setFlipX(true),
            player.play("walkRight",true),
            player.anims.msPerFrame = 100 
        }
        else if(playerDirection == "a")
        {
            player.play("idleRight", true)
            player.anims.msPerFrame = 100  
        }
        if (playerDirection == "d" && keys.f.isDown)
        {
            player.setFlipX(false)
            player.body.setSize(35,20)
            player.setOffset(15,20)
            player.play("attackRight",true)
            player.anims.msPerFrame = 100
        }
        else if (keys.d.isDown)
        {
            playerDirection = "d"
            player.setVelocityX(100),
            player.setFlipX(false),
            player.play("walkRight",true),
            player.anims.msPerFrame = 100
        }
        else if(playerDirection == "d")
        {
            player.play("idleRight", true)
            player.anims.msPerFrame = 100
        }
    }
}
var Movement = new BaseScene()


export default class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game")
        this.player
        this.slime
    }

    preload() {
    
        this.load.spritesheet("player", "src/assets/sprites/characters/player.png",
        {
        frameWidth:48,
        frameHeight:48
        })
        this.load.spritesheet("slime", "src/assets/sprites/characters/slime.png",
        {
            frameWidth:32,
            frameHeight:32
        })
        this.load.image("door", "src/assets/shutDoor.png")
    }
    ShopClicked()
    {
        playerX = this.player.body.x
        playerY = this.player.body.y
        this.scene.start("scene-shop")
    }

    create() {



        Variables.currentFloor = 1
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f,e")
      //  this.add.image(0, 0, "tiles").setOrigin(0,0)
        const map = this.make.tilemap({key: 'dungeon'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        const RoomCornerLayer = map.createLayer("RoomCorner", tileset, 0, 0)
        const SideTopWallLayer = map.createLayer("Side/TopWall", tileset, 0 ,0)
        const BottomWallLayer = map.createLayer("BottomWall", tileset, 0, 0)
        const Stairs = map.createLayer("StairLayer", tileset, 0, 0)
      //  RoomCornerLayer.setCollisionBetween(322, 323)
        //SideTopWallLayer.setCollisionBetween(2, 324)
        BottomWallLayer.setCollisionBetween(2, 3)
        BottomWallLayer.setCollisionBetween(481, 482)
        BottomWallLayer.setCollisionBetween(484, 485)
    


       
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())


        if(createAnims == false)
        {
            createAnims = true
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
        }


        
        this.player = this.physics.add.sprite(800, 140, "player")
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
        this.physics.add.collider(this.player, SideTopWallLayer)
        this.physics.add.collider(this.player, RoomCornerLayer)
        this.physics.add.collider(this.player, BottomWallLayer)
        this.physics.add.collider(this.player, this.DoorLayer)
        this.slime2 = this.physics.add.sprite(400, 400, "slime2")
        this.slime2.play("idle", true)
        this.slime2.anims.msPerFrame = 150
        this.physics.add.collider(this.player, this.slime2)
        this.slime2.body.setSize(10, 10)
        this.slime2.setImmovable(true)

        this.doors = this.physics.add.sprite(784,110, 'door').setScale(.38)
        this.doors.setImmovable(true)
        this.physics.add.collider(this.player, this.doors)


        this.physics.add.overlap(this.slime, this.player, this.battle, undefined, this)
        this.physics.add.overlap(this.slime2, this.player, this.battle2, undefined, this)
        this.stairs = new Phaser.Geom.Rectangle(815, 60, 50, 50)

        this.opendoor = new Phaser.Geom.Rectangle(744, 120, 60, 32)
        

        Variables.battle = true
        Variables.battle2=true
        Variables.battle3 =true
    }

    battle2()
    {
        this.player.stop()
        playerX = this.player.body.x
        playerY = this.player.body.y
        if(Variables.battle2 == false)
        {
            Variables.battle2 = true
            this.scene.start("scene-battle")
        }
    }

    battle()
    {
        this.player.stop()
        playerX = this.player.body.x
        playerY = this.player.body.y
        if (Variables.battle == false)
        {
            Variables.battle = true
            this.scene.start("scene-battle")
        }
    }

    update() 
    {


  
        if(this.stairs.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.scene.start("scene-game-floor2", this.player)
            
        }

        if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown && Variables.battle && Variables.battle2 && Variables.battle3)
        {
            this.doors.destroy()
        }

       Movement.movement(this.player, this.keys)

        if(Variables.battle == true)
        {
            this.slime.destroy(true)
        }
        if(Variables.battle2 == true)
        {
            this.slime2.destroy(true)
        }
 
    }
}

export class GameSceneFloor2 extends Phaser.Scene {
    constructor() {
        super("scene-game-floor2")
        this.player
    }
    preload()
    {

    }

    create()
    {
        Variables.currentFloor = 2
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f")
     //   this.add.image(0, 0, "tiles").setOrigin(0,0)
        const map = this.make.tilemap({key: 'floor2'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        
        const BottomTopWallLayer = map.createLayer("Top/BottomWall", tileset, 0, 0)
        const SideWallLayer = map.createLayer("SideWall", tileset, 0 ,0)
        SideWallLayer.setCollisionBetween(322, 324)
        BottomTopWallLayer.setCollisionBetween(2, 4)
       
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())


        this.player = this.physics.add.sprite(800, 80, "player")   
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 150
        this.player.body.setSize(16,24)
        this.player.setCollideWorldBounds(true)
    }
    ShopClicked()
    {
        playerX = this.player.body.x
        playerY = this.player.body.y
        this.scene.start("scene-shop")
    }

    update()
    {

       Movement.movement(this.player, this.keys)

    }
}