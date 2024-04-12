import { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms"

var playerDirection
export class variables
{
    battle = false
    battle2 = false
    battle3 = false
    boss = false
    money = 999999999999999
    opendoors = false
    highestFloorClear = 0
    currentFloor = 1
    enemyKey = ""
    battleNum = 0
}


export var Variables = new variables()

var createAnims = false
var playerX = 800
var playerY = 140


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
        this.load.spritesheet("Slime", "src/assets/sprites/characters/slime.png",
        {
            frameWidth:32,
            frameHeight:32
        })
        this.load.image("door", "src/assets/shutDoor.png")


        this.load.spritesheet("tilese", "src/assets/Dungeon_tiles.png",
        {
            frameWidth:16,
            frameHeight:16
        })
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
        RoomCornerLayer.setCollisionBetween(322, 323)
        SideTopWallLayer.setCollisionBetween(2, 3)
        SideTopWallLayer.setCollisionBetween(322,324)
        BottomWallLayer.setCollisionBetween(2, 3)
        SideTopWallLayer.setCollisionBetween(481,482)
        SideTopWallLayer.setCollisionBetween(484,485)
        BottomWallLayer.setCollisionBetween(481,482)
        BottomWallLayer.setCollisionBetween(484,485)


       this.anims.create({
        key:"open",
        frames:this.anims.generateFrameNumbers("tilese", {frames:[851,852,853]}),
        framerate:16,

       })
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())

        this.chest1 = this.physics.add.sprite(744,56,"tilese")
        this.chest2 = this.physics.add.sprite(776,56,"tilese")
        this.chest3 = this.physics.add.sprite(808,56,"tilese")
       // this.chest.play("open")
        //this.chest.anims.msPerFrame = 250
        if(createAnims == false)
        {
            createAnims = true
            this.anims.create({
                key:"idle",
                frames:this.anims.generateFrameNumbers("Slime", {frames:[0,1,2,3]}),
                frameRate:16,
                repeat:-1
            })
            this.anims.create({
                key:"mediumJump",
                frames:this.anims.generateFrameNumbers("Slime", {frames:[7,8,9,10,11,12]}),
                framerate:16,
                repeat:-1
            })
            this.anims.create({
                key:"longJump",
                frames:this.anims.generateFrameNumbers("Slime", {frames:[14,15,16,17,18,19,20]}),
                framerate:16,
                repeat:-1
            })
            this.anims.create({
                key:"shortJump",
                frames:this.anims.generateFrameNumbers("Slime", {frames:[21,22,23]}),
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


        
        this.player = this.physics.add.sprite(playerX, playerY, "player")
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 100
        this.slime = this.physics.add.sprite(200,200, "Slime")
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
        this.slime2 = this.physics.add.sprite(400, 400, "Slime2")
        this.slime2.play("idle", true)
        this.slime2.anims.msPerFrame = 150
        this.physics.add.collider(this.player, this.slime2)
        this.slime2.body.setSize(10, 10)
        this.slime2.setImmovable(true)
        this.doors = this.physics.add.sprite(784,110, 'door').setScale(.38)
        this.doors.setImmovable(true)
        this.physics.add.collider(this.player, this.doors)

        if(Variables.highestFloorClear > 0)
        {
            this.doors.destroy()
        }
        this.physics.add.overlap(this.slime, this.player, this.battle, undefined, this)
        this.physics.add.overlap(this.slime2, this.player, this.battle, undefined, this)
        this.stairs = new Phaser.Geom.Rectangle(815, 60, 50, 50)

        this.opendoor = new Phaser.Geom.Rectangle(744, 120, 60, 32)
        this.openchest1 = new Phaser.Geom.Rectangle(732, 64, 24, 16)
        this.openchest2 = new Phaser.Geom.Rectangle(764, 64, 24, 16)
        this.openchest3 = new Phaser.Geom.Rectangle(792, 64, 24, 16)
        

Variables.battle3 = true
 
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

    battle(enemy)
    {
        this.player.stop()
        playerX = this.player.body.x
        playerY = this.player.body.y
        Variables.enemyKey = enemy.texture.key
        console.log(Variables.enemyKey.includes("Slime"))
        console.log(enemy.texture.key)
        this.scene.start("scene-battle")
    }

    update() 
    {


  
        if(this.stairs.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.scene.start("scene-game-floor5", this.player)
            playerX = 800
            playerY = 80
            
        }

        if(this.openchest1.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest1.play("open")
        }
        if(this.openchest2.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest2.play("open")
        }
        if(this.openchest3.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest3.play("open")
        }

        if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown && Variables.battle && Variables.battle2 && Variables.battle3)
        {
            if(Variables.highestFloorClear < 1)
            {
                Variables.highestFloorClear = 1
            }
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
        this.load.image('door', "./src/assets/shutDoor.png")
        this.load.spritesheet("DungeonMasterDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("SlimeKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Slime King Walk.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SkeletonKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Skeleton King Walking.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
    }

    create()
    {

        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("DungeonMasterDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
        })
        this.anims.create({
            key:"SlimeKingWalk",
            frames:this.anims.generateFrameNumbers("SlimeKingWalk"),
            framerate:16,
            repeat:-1
        })
        this.anims.create({
            key:"SkeletonKingWalk",
            frames:this.anims.generateFrameNumbers("SkeletonKingWalk"),
            framerate:16,
            repeat:-1
        })
        Variables.currentFloor = 2
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f,e")
        const map = this.make.tilemap({key: 'floor2'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        const BottomTopWallLayer = map.createLayer("Top/BottomWall", tileset, 0, 0)
        const SideWallLayer = map.createLayer("SideWall", tileset, 0 ,0)
        SideWallLayer.setCollisionBetween(322, 324)
        BottomTopWallLayer.setCollisionBetween(2, 4)
        BottomTopWallLayer.setCollisionBetween(481,482)
        BottomTopWallLayer.setCollisionBetween(484,485)
       
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())

        this.chest1 = this.physics.add.sprite(760,456,"tilese")
        this.chest2 = this.physics.add.sprite(792,456,"tilese")
        this.chest3 = this.physics.add.sprite(824,456,"tilese")

        this.openchest1 = new Phaser.Geom.Rectangle(748, 464, 24, 16)
        this.openchest2 = new Phaser.Geom.Rectangle(780, 464, 24, 16)
        this.openchest3 = new Phaser.Geom.Rectangle(812, 464, 24, 16)

        this.dungeonmaster = this.physics.add.sprite(400,400, "DungeonMasterDeath")
        this.dungeonmaster.play("Death", true)
        this.dungeonmaster.anims.msPerFrame = 150
        
        this.slimeKing = this.physics.add.sprite(200,200, "SlimeKingWalk").setScale(.5)
        this.slimeKing.play("SlimeKingWalk", true)
        this.slimeKing.anims.msPerFrame = 150

        this.skeletonKing = this.physics.add.sprite(300,300, "SkeletonKingWalk").setScale(.5)
        this.skeletonKing.play("SkeletonKingWalk", true)
        this.skeletonKing.anims.msPerFrame = 150

        this.player = this.physics.add.sprite(playerX, playerY, "player")   
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 150
        this.player.body.setSize(16,24)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, BottomTopWallLayer)
        this.physics.add.collider(this.player, SideWallLayer)

        this.doors = this.physics.add.sprite(592, 430, 'door').setScale(.38)
        this.doors.setImmovable(true)
        this.physics.add.collider(this.player, this.doors)
        if(Variables.highestFloorClear > 1)
        {
            this.doors.destroy()
        }
        this.downFloor = new Phaser.Geom.Rectangle(784, 50, 64, 48)
        this.upFloor = new Phaser.Geom.Rectangle(784, 500, 64, 48)
        this.opendoor = new Phaser.Geom.Rectangle(560, 368, 60, 32)
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
       if(this.openchest1.contains(this.player.x, this.player.y) && this.keys.e.isDown)
       {
           this.chest1.play("open")
       }
       if(this.openchest2.contains(this.player.x, this.player.y) && this.keys.e.isDown)
       {
           this.chest2.play("open")
       }
       if(this.openchest3.contains(this.player.x, this.player.y) && this.keys.e.isDown)
       {
           this.chest3.play("open")
       }
       if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
       {
            console.log("1")
            this.doors.destroy()
       }
        if(this.downFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            console.log("r")
            playerX = 825   
            playerY = 80
            this.scene.start("scene-game", this.player)
        }
        else if (this.upFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            console.log("q")
            playerX =775
            playerY = 525
            if(Variables.highestFloorClear < 2)
            {
                Variables.highestFloorClear = 2
            }
            this.scene.start("scene-game-floor3", this.player)
        }
    }
}

export class GameSceneFloor3 extends Phaser.Scene{
    constructor() {
        super("scene-game-floor3")
        this.player
    }

    preload()
    {
        this.load.image('door', "./src/assets/shutDoor.png")
        this.load.spritesheet('Orc', "./src/assets/Monster RPG pack/Orc1 64x48.png",
        {
            frameWidth:64,
            frameHeight:48
        })
    }
    create()
    {
        Variables.currentFloor = 3
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f,e")
        const map = this.make.tilemap({key: 'floor3'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        
        const BottomTopWallLayer = map.createLayer("Top/BottomWall", tileset, 0, 0)
        const SideWallLayer = map.createLayer("SideWall", tileset, 0 ,0)
        SideWallLayer.setCollisionBetween(322, 324)
        BottomTopWallLayer.setCollisionBetween(2, 4)
        BottomTopWallLayer.setCollisionBetween(481,482)
        BottomTopWallLayer.setCollisionBetween(484,485)
       
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())


        this.anims.create({
            key:"OrcIdle",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[9,10,11,12]}),
            frameRate:16,
            repeat:-1
        })
        this.anims.create({
            key:"OrcWalk",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[18,19,20,21]}),
            frameRate:16,
            repaet:-1
        })



        this.player = this.physics.add.sprite(playerX, playerY, "player")   
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 150
        this.player.body.setSize(16,24)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, SideWallLayer)
        this.physics.add.collider(this.player, BottomTopWallLayer)


        this.chest1 = this.physics.add.sprite(312,56,"tilese")
        this.chest2 = this.physics.add.sprite(344,56,"tilese")
        this.chest3 = this.physics.add.sprite(376,56,"tilese")

        this.openchest1 = new Phaser.Geom.Rectangle(304, 64, 24, 16)
        this.openchest2 = new Phaser.Geom.Rectangle(334, 64, 24, 16)
        this.openchest3 = new Phaser.Geom.Rectangle(356, 64, 24, 16)

        this.doors = this.physics.add.sprite(336, 128, 'door').setScale(.38)
        this.doors.setImmovable(true)
        this.physics.add.collider(this.player, this.doors)
        if(Variables.highestFloorClear > 2)
        {
            this.doors.destroy()
        }
        this.upFloor = new Phaser.Geom.Rectangle(276, 80, 48, 32)
        this.downFloor = new Phaser.Geom.Rectangle(764, 504, 64, 48)
        this.opendoor = new Phaser.Geom.Rectangle(300, 128, 64, 32)


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

        if(this.openchest1.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest1.play("open")
        }
        if(this.openchest2.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest2.play("open")
        }
        if(this.openchest3.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest3.play("open")
        }

               if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
       {
            console.log("1")
            this.doors.destroy()
       }
        if(this.downFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            console.log("r")
            playerX =792
            playerY = 525
            this.scene.start("scene-game-floor2", this.player)
        }
        if (this.upFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            if(Variables.highestFloorClear < 3)
            {
                Variables.highestFloorClear = 3
            }
            console.log("q")
            playerX = 300
            playerY = 80
            this.scene.start("scene-game-floor4", this.player)
        }
    }

}

export class GameSceneFloor4 extends Phaser.Scene{
    constructor(){
        super("scene-game-floor4")
        this.player
    }

    preload()
    {
        this.load.image('door', "./src/assets/shutDoor.png")
        this.load.spritesheet("SkeletonKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Skeleton King Walking.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet('Skeleton', "./src/assets/Monster RPG pack/Skeleton1 64x48.png",
        {
            frameWidth:64,
            frameHeight:48
        })
    }
    create()
    {
        Variables.currentFloor = 4
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f,e")
        const map = this.make.tilemap({key: 'floor4'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        
        const BottomTopWallLayer = map.createLayer("Top/BottomWall", tileset, 0, 0)
        const SideWallLayer = map.createLayer("SideWall", tileset, 0 ,0)
        SideWallLayer.setCollisionBetween(322, 324)
        BottomTopWallLayer.setCollisionBetween(2, 4)
        BottomTopWallLayer.setCollisionBetween(481,482)
        BottomTopWallLayer.setCollisionBetween(484,485)

        this.anims.create({
            key:"SkeletonKingWalk",
            frames:this.anims.generateFrameNumbers("SkeletonKingWalk"),
            framerate:16,
            repeat:-1
        })        
        this.anims.create({
            key:"SkeletonIdle",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames: [9,10,11,12]}),
            framerate:16,
            repeat:-1
        })        
        this.anims.create({
            key:"SkeletonWalk",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames:[18,19,20,21]}),
            framerate:16,
            repeat:-1
        })        
        this.skeletonKing = this.physics.add.sprite(400,400, "SkeletonKingWalk").setScale(.5)
        this.skeletonKing.play("SkeletonKingWalk", true)
        this.skeletonKing.anims.msPerFrame = 150
        this.skeletonKing.setImmovable(true)
        this.skeletonKing.setVelocityX(40)
        this.skeletonKing.body.setSize(240,200)

        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())
        this.doors = this.physics.add.sprite(592, 480, 'door').setScale(.38)
        this.doors.setImmovable(true)
312
        this.chest1 = this.physics.add.sprite(536,504,"tilese")
        this.chest2 = this.physics.add.sprite(568,504,"tilese")
        this.chest3 = this.physics.add.sprite(616,504,"tilese")
        this.chest4 = this.physics.add.sprite(648,504,"tilese")

        this.openchest1 = new Phaser.Geom.Rectangle(532, 508, 24, 16)
        this.openchest2 = new Phaser.Geom.Rectangle(554, 508, 24, 16)
        this.openchest3 = new Phaser.Geom.Rectangle(604, 508, 24, 16)
        this.openchest4 = new Phaser.Geom.Rectangle(628, 508, 24, 16)

        this.player = this.physics.add.sprite(playerX, playerY, "player")   
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 150
        this.player.body.setSize(16,24)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, SideWallLayer)
        this.physics.add.collider(this.player, BottomTopWallLayer)
        this.physics.add.collider(this.player, this.doors)

        this.upFloor = new Phaser.Geom.Rectangle(516, 530, 48, 32, 0xffffff)
        this.downFloor = new Phaser.Geom.Rectangle(280, 48, 64, 48, 0xffffff)
        this.opendoor = new Phaser.Geom.Rectangle(560, 418, 64, 32, 0xffffff)

        
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

        if(this.skeletonKing.x > 800)
        {
            this.skeletonKing.setVelocityX(-40)
            this.skeletonKing.setFlipX(true)
        }
        else if(this.skeletonKing.x < 320)
        {
            this.skeletonKing.setVelocityX(40)
            this.skeletonKing.setFlipX(false)
        }

        if(this.openchest1.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest1.play("open")
        }
        if(this.openchest2.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest2.play("open")
        }
        if(this.openchest3.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest3.play("open")
        }
        if(this.openchest4.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest4.play("open")
        }

        if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
             console.log("1")
             this.doors.destroy()
        }
         if(this.downFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
         {
             console.log("r")
             playerX =312
             playerY = 80
             this.scene.start("scene-game-floor3", this.player)
         }
         if (this.upFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
         {
             if(Variables.highestFloorClear < 4)
             {
                 Variables.highestFloorClear = 4
             }
             console.log("q")
             playerX = 552
             playerY = 544
             this.scene.start("scene-game-floor5", this.player)
         }
         
    }
}

export class GameSceneFloor5 extends Phaser.Scene{
    constructor(){
        super("scene-game-floor5")
        this.player
    }

    preload()
    {
        this.load.image('door', "./src/assets/shutDoor.png")
        this.load.spritesheet("DungeonMaster", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Walk.png",
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("DungeonMasterDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
    }
    create()
    {

        
        this.anims.create({
            key:"Walk",
                frames:this.anims.generateFrameNumbers("DungeonMaster", {frames:[4,5,6,7]}),
            frameRate:16,
            repeat:-1
        })

        Variables.currentFloor = 5
        this.keys = this.input.keyboard.addKeys("w,a,s,d,f,e")
        const map = this.make.tilemap({key: 'floor5'}) 
        map.addTilesetImage('0x72_DungeonTilesetII_v1.6', 'tiles')
        const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.6", "tiles")
        const GroundLayer =  map.createLayer("Ground", tileset, 0, 0)
        
        const BottomTopWallLayer = map.createLayer("Top/BottomWall", tileset, 0, 0)
        const SideWallLayer = map.createLayer("SideWall", tileset, 0 ,0)
        SideWallLayer.setCollisionBetween(322, 324)
        BottomTopWallLayer.setCollisionBetween(2, 4)
        BottomTopWallLayer.setCollisionBetween(481,482)
        BottomTopWallLayer.setCollisionBetween(484,485)
       
        let ShopButton = this.add.text(0,0,"Shop").setInteractive().on('pointerdown', () => this.ShopClicked())

        this.chest1 = this.physics.add.sprite(520, 56,"tilese")
        this.chest2 = this.physics.add.sprite(552, 56,"tilese")
        this.chest3 = this.physics.add.sprite(584, 56,"tilese")
        this.chest4 = this.physics.add.sprite(616, 56,"tilese")
        this.chest5 = this.physics.add.sprite(648, 56,"tilese")
        this.chest6 = this.physics.add.sprite(680, 56,"tilese")
        
        this.openchest1 = new Phaser.Geom.Rectangle(508, 64, 24, 16)
        this.openchest2 = new Phaser.Geom.Rectangle(540, 64, 24, 16)
        this.openchest3 = new Phaser.Geom.Rectangle(564, 64, 24, 16)
        this.openchest4 = new Phaser.Geom.Rectangle(604, 64, 24, 16)
        this.openchest5 = new Phaser.Geom.Rectangle(636, 64, 24, 16)
        this.openchest6 = new Phaser.Geom.Rectangle(668, 64, 24, 16)

        this.player = this.physics.add.sprite(playerX, playerY, "player")   
        this.player.play("idleDown",true)
        this.player.anims.msPerFrame = 150
        this.player.body.setSize(16,24)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, SideWallLayer)
        this.physics.add.collider(this.player, BottomTopWallLayer)
        this.doors = this.physics.add.sprite(592, 144, 'door').setScale(.38)
        this.doors.setImmovable(true)
        this.physics.add.collider(this.player, this.doors)

        this.opendoor = new Phaser.Geom.Rectangle(556, 152, 64, 32, 0xffffff)
        this.downFloor = new Phaser.Geom.Rectangle(540, 510, 64, 48, 0xffffff)

        this.DungeonMaster = this.physics.add.sprite(510, 200, "DungeonMaster").setScale(.666667)
        this.DungeonMaster.play("Walk", true)
        this.DungeonMaster.anims.msPerFrame = 250
        this.DungeonMaster.setSize(80,160)
        this.DungeonMaster.setImmovable(true)
        this.DungeonMaster.setVelocityX(40)
        this.DungeonMaster.setBounce(1)


        this.physics.add.collider(this.DungeonMaster, SideWallLayer)
        this.physics.add.collider(this.DungeonMaster, BottomTopWallLayer)
        this.physics.add.collider(this.DungeonMaster, this.doors)
        this.physics.add.collider(this.player, this.DungeonMaster)

        this.physics.add.overlap(this.DungeonMaster, this.player, this.battle, undefined, this)
    }

    ShopClicked()
    {
        playerX = this.player.body.x
        playerY = this.player.body.y
        this.scene.start("scene-shop")
    }

    battle(enemy)
    {
        this.player.stop()
        playerX = this.player.body.x
        playerY = this.player.body.y
        Variables.enemyKey = enemy.texture.key
        console.log(enemy.texture.key)
        this.scene.start("scene-battle")
    }
    
    update()
    {
        Movement.movement(this.player, this.keys)
        
        if(this.DungeonMaster.x > 800)
        {
            this.DungeonMaster.setVelocityX(-40)
            this.DungeonMaster.setFlipX(true)
        }
        else if(this.DungeonMaster.x < 320)
        {
            this.DungeonMaster.setVelocityX(40)
            this.DungeonMaster.setFlipX(false)
        }

        if(this.openchest1.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest1.play("open")
        }
        if(this.openchest2.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest2.play("open")
        }
        if(this.openchest3.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest3.play("open")
        }
        if(this.openchest4.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest4.play("open")
        }
        if(this.openchest5.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest5.play("open")
        }
        if(this.openchest6.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            this.chest6.play("open")
        }
        if(this.opendoor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
             console.log("1")
             this.doors.destroy()
        }
        if(this.downFloor.contains(this.player.x, this.player.y) && this.keys.e.isDown)
        {
            console.log("r")
            playerX = 552
            playerY = 80
            this.scene.start("scene-game-floor4", this.player)
        }

    }

}