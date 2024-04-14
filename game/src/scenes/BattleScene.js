import { Player } from '../classes/player.js'
import { Entity } from '../classes/entity.js'
import {Slime} from '../classes/enemies/slime.js'
import { Weapon } from '../classes/items/Weapons/weapon.js'
import { Sword } from '../classes/items/Weapons/Sword.js'
import { WarriorArmour } from '../classes/items/Armour/WarriorArmour.js'
import { Variables }from '../scenes/Maingame.js'
import { SmallHealthPotion } from '../classes/items/Potions/smallHealthPotion.js'
import { HealthPotion } from '../classes/items/Potions/healthPotion.js'
import { LargeHealthPotion } from '../classes/items/Potions/largeHealthPotion.js'
import { DungeonMaster } from '../classes/Bosses/dungeonMaster.js'
import { SkeletonKing } from '../classes/Bosses/skeletonKing.js'
import { GoblinKing } from '../classes/Bosses/goblinKing.js'
import { SlimeKing } from '../classes/Bosses/slimeKing.js'
import { Skeleton } from '../classes/enemies/skeleton.js'
import { Orc } from '../classes/enemies/orc.js'

var created = false

export default class battleScene extends Phaser.Scene{
    constructor(){
        super("scene-battle")
    }
    preload()
    {
        this.load.image('left-cap', './src/assets/PNG/barHorizontal_green_left.png')
        this.load.image('middle', './src/assets/PNG/barHorizontal_green_mid.png')
        this.load.image('right-cap', './src/assets/PNG/barHorizontal_green_right.png')
    
        this.load.image('left-cap-shadow', './src/assets/PNG/barHorizontal_shadow_left.png')
        this.load.image('middle-shadow', './src/assets/PNG/barHorizontal_shadow_mid.png')
        this.load.image('right-cap-shadow', './src/assets/PNG/barHorizontal_shadow_right.png')
        this.load.image("map2", "src/assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
        this.load.spritesheet("DungeonMasterDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("DungeonMasterWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Walk.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("DungeonMasterProjectile", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Projectile 1.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("DungeonMasterBlast", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Blast 1.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("GoblinKingDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("GoblinKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Walk.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("GoblinKingProjectile", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Projectile.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("GoblinKingBlast", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Blast.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SkeletonKingDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Skeleton King Death.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SkeletonKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Skeleton King Walk.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SlimeKingDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Slime King Death.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SlimeKingWalk", "./src/assets/Roguelike Dungeon - Asset Bundle/Slime King Walk.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("Skeleton", "./src/assets/Monster RPG pack/Skeleton1 64x48.png",
        {
            frameWidth:64,
            frameHeight:48
        })
        this.load.spritesheet("Orc", "./src/assets/Monster RPG pack/Orc1 64x48.png",
        {
            frameWidth:64,
            frameHeight:48
        })
        this.load.spritesheet("SlimeNew", "./src/assets/Monster RPG pack/Slime 32x32.png",{
            frameHeight:32,
            frameWidth:32
        })
    }
    setMeterPercentage(percent = 1, middle, rightCap)
{
	const width = 120 * percent

	middle.displayWidth = width
	rightCap.x = middle.x + middle.displayWidth
}
setMeterPercentageAnimated(percent = 1, duration = 1000)
{
	const width = 120 * percent

	this.tweens.add({
		targets: this.middle,
		displayWidth: width,
		duration,
		ease: Phaser.Math.Easing.Sine.Out,
		onUpdate: () => {
			this.rightCap.x = this.middle.x + this.middle.displayWidth

			this.leftCap.visible = this.middle.displayWidth > 0
			this.middle.visible = this.middle.displayWidth > 0
			this.rightCap.visible = this.middle.displayWidth > 0
		}
	})
}
    setMeterPercentageAnimatedE(percent = 1, duration = 1000)
{
	const width = 120 * percent

	this.tweens.add({
		targets: this.enemyMiddle,
		displayWidth: width,
		duration,
		ease: Phaser.Math.Easing.Sine.Out,
		onUpdate: () => {
			this.enemyRightCap.x = this.enemyMiddle.x + this.enemyMiddle.displayWidth

			this.enemyLeftCap.visible = this.enemyMiddle.displayWidth > 0
			this.enemyMiddle.visible = this.enemyMiddle.displayWidth > 0
			this.enemyRightCap.visible = this.enemyMiddle.displayWidth > 0
		}
	})
}
    create()
    {


        const leftShadowCap = this.add.image(300, 240, 'left-cap-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	const middleShaddowCap = this.add.image(leftShadowCap.x + leftShadowCap.width, 240, 'middle-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)
	middleShaddowCap.displayWidth =120

	this.add.image(middleShaddowCap.x + middleShaddowCap.displayWidth, 240, 'right-cap-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)

        this.leftCap = this.add.image(300, 240, 'left-cap')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	this.middle = this.add.image(this.leftCap.x + this.leftCap.width, 240, 'middle')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	this.rightCap = this.add.image(this.middle.x + this.middle.displayWidth, 240, 'right-cap')
		.setOrigin(0, 0.5).setScale(1, 0.5)

        this.setMeterPercentage(1, this.middle, this.rightCap)





        const enemyLeftShadowCap = this.add.image(600, 240, 'left-cap-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	const enemyMiddleShaddowCap = this.add.image(enemyLeftShadowCap.x + enemyLeftShadowCap.width, 240, 'middle-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)
	enemyMiddleShaddowCap.displayWidth =120

	this.add.image(enemyLeftShadowCap.x + enemyLeftShadowCap.displayWidth, 240, 'right-cap-shadow')
		.setOrigin(0, 0.5).setScale(1, 0.5)

        this.enemyLeftCap = this.add.image(600, 240, 'left-cap')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	this.enemyMiddle = this.add.image(this.enemyLeftCap.x + this.enemyLeftCap.width, 240, 'middle')
		.setOrigin(0, 0.5).setScale(1, 0.5)

	this.enemyRightCap = this.add.image(this.enemyMiddle.x + this.enemyMiddle.displayWidth, 240, 'right-cap')
		.setOrigin(0, 0.5).setScale(1, 0.5)

        this.setMeterPercentage(1, this.enemyMiddle, this.enemyRightCap)

        this.DeleteAnims()
      var enemy = new Slime();
      this.anims.create({
        key:"EnemyIdle",
        frames:this.anims.generateFrameNumbers("SlimeNew", {frames:[0,1,2,3]}),
        frameRate:16,
        repeat:-1
    })
    this.anims.create({
        key:"EnemyAttack",
        frames:this.anims.generateFrameNumbers("SlimeNew", {frames:[4,5,6,7,8]}),
        frameRate:16,
    })
    this.anims.create({
        key:"EnemyHit",
        frames:this.anims.generateFrameNumbers("SlimeNew", {frames:[9,10,11]}),
        frameRate:16,
    })
    this.anims.create({
        key:"Death",
        frames:this.anims.generateFrameNumbers("SlimeNew", {frames:[10, 11, 10]}),
        frameRate:16,
    })
    this.enemy = this.add.sprite(700,200, "enemy")
    this.player = this.add.sprite(300,200, "player")

      const player = Variables.player
      const sword = Variables.weapon
      const armour = Variables.armour
      this.map = this.add.image(0,0,"map2").setOrigin(0,0)
      if(Variables.enemyKey == "DungeonMaster")
      {
        enemy = new DungeonMaster()
        this.DeleteAnims()
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("DungeonMasterDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("DungeonMasterWalk", {frames:[4]})
        })
        this.anims.create({
            key:"Projectile",
            frames:this.anims.generateFrameNumbers("DungeonMasterProjectile", ),
            repeat:-1
        })
        this.anims.create({
            key:"Blast",
            frames:this.anims.generateFrameNumbers("DungeonMasterBlast", ),
            repeat:-1
        })
      }
      else if (Variables.enemyKey == "SkeletonKingWalk")
      {
        enemy = new SkeletonKing()
        this.DeleteAnims()
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("SkeletonKingDeath", {frames:[0,1,2,3]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("SkeletonKingWalk", {frames:[0]})
        })
      }
      else if (Variables.enemyKey == "GoblinKingWalk")
      {
        enemy = new GoblinKing()
        this.DeleteAnims()
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("GoblinKingDeath", {frames:[4,5,6,7]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("GoblinKingWalk", {frames:[4]})
        })
        this.anims.create({
            key:"Projectile",
            frames:this.anims.generateFrameNumbers("GoblinKingProjectile", {frames:[0,1,2,3,0,1,2,3]}),
        })
        this.anims.create({
            key:"Blast",
            frames:this.anims.generateFrameNumbers("GoblinKingBlast", ),
        })
      }
      else if(Variables.enemyKey == "SlimeKingWalk")
      {
        enemy = new SlimeKing()
        this.DeleteAnims()
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("SlimeKingDeath", {frames:[0,1,2,3]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("SlimeKingWalk", {frames:[0]})
        })
      }
      else if(Variables.enemyKey.includes("Skeleton") && Variables.enemyKey != "SkeletonKing")
      {
        enemy = new Skeleton()
        this.DeleteAnims()
        this.anims.create({
            key:"EnemyAttack",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames:[5,6,7,8]})
        })
        this.anims.create({
            key:"EnemyHit",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames:[32,33,34,35]})
        })
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames:[32,33,34]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("Skeleton", {frames:[9,10,11,12]}),
            frameRate:16,
            repeat:-1
        })

      }
      else if (Variables.enemyKey == "Orc")
      {
        enemy = new Orc()
        this.DeleteAnims()
        this.anims.create({
            key:"EnemyAttack",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[5,6,7,8]})
        })
        this.anims.create({
            key:"EnemyHit",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[32,33,34,35]})
        })
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[32,33,34]})
        })
        this.anims.create({
            key:"EnemyIdle",
            frames:this.anims.generateFrameNumbers("Orc", {frames:[9,10,11,12]}),
            frameRate:16,
            repeat:-1
        })
      }
      else if(Variables.enemyKey.includes("Slime"))
      {
        this.anims.create({
            key:"Death",
            frames:this.anims.generateFrameNumbers("Slime", {frames:[28,29,30,31, 32]}),
            framerate:16,
            repeat:0
        })
      }

      
        let AttackButton = this.add.text(430,300,"Attack").setInteractive().on('pointerdown', () => this.AttackButtonClicked(enemy, player, AttackButton, ItemButton, RunButton, sword, armour, Attack, Item, Run))

        let ItemButton = this.add.text(498,300,"Item").setInteractive().on('pointerdown', () => this.ItemButtonClicked(player, Variables.smallHealthPotion, Variables.healthPotion, Variables.largeHealthPotion))
      
        let RunButton = this.add.text(550,300,"Run").setInteractive().on('pointerdown', () => this.RunButtonClicked(enemy, player))

        let Attack = this.add.text(430,300,"Attack")
        let Item = this.add.text(498,300,"Item")
        let Run = this.add.text(550,300,"Run")
 
        this.player.play("idleRight", true)
        this.player.anims.msPerFrame = 100
        this.enemy.setFlipX(true)
        this.enemy.play("EnemyIdle", true)
        this.enemy.anims.msPerFrame = 150
    }

    AttackButtonClicked(enemy, player, AttackButton, ItemButton, RunButton, sword, armour, Attack, Item, Run)
    {
        AttackButton.text = ""
        ItemButton.text = ""
        RunButton.text = ""

        this.time.addEvent({
            delay:300,
            callback: ()=>{
                enemy.health = enemy.health - player.attack - sword.damage;
                this.player.play("attackRight", 4,false).once("animationcompelte", ()=>{
                    this.player.play("idleRight")
                })
                 this.player.anims.msPerFrame = 100
                 if(enemy.health/enemy.maxHealth >= 0)
                 {
                    this.setMeterPercentageAnimatedE(enemy.health/enemy.maxHealth)
                }
                 this.enemy.play("EnemyHit").once('animationcomplete', () =>{
                
                    if(enemy.health <= 0)
                    {
                        if(Variables.enemyID == "1")
                        {
                            Variables.battle1 = true
                        }
                        else if(Variables.enemyID == "2")
                        {
                            Variables.battle2 = true
                        }
                        else if(Variables.enemyID == "3")
                        {
                            Variables.battle3 = true
                        }
                        else if(Variables.enemyID == "Boss")
                        {
                            Variables.boss = true
                        }
                        if(Variables.enemyKey == "SlimeKingWalk" || Variables.enemyKey == "GoblinKingWalk" || Variables.enemyKey == "SkeletonKingWalk" || Variables.enemyKey == "DungeonMasterWalk")
                        {
                            Variables.boss = true
                        }
                        enemy.health = 0
                        this.setMeterPercentageAnimatedE(0)
                        this.enemy.play("Death", true)
                        this.enemy.anims.msPerFrame = 400
                        AttackButton.destroy()
                        ItemButton.destroy()
                        RunButton.destroy()
                        Attack.destroy()
                        Item.destroy()
                        Run.destroy()
                        Variables.money += enemy.moneyDrop
                        this.add.text(500,200,"You Won The Battle");
                        let leaveButton = this.add.text(500, 250, "Leave").setInteractive().on('pointerdown', () => this.leaveScene())
                    }
                    else
                    {
                        if(player.defence + armour.defence > enemy.attack)
                        {
                            player.health = player.health
                        }
                        else
                       {
                           player.health = player.health - enemy.attack + player.defence + armour.defence
                       }
                        
                        if(Variables.enemyKey == "GoblinKingWalk" || Variables.enemyKey == "DungeonMasterWalk")
                        {
                            this.projectile = this.physics.add.sprite(680,200, "DungeonMasterProjectile")
                            this.projectile.setFlipX(true)
                            this.projectile.play("Projectile", true)
                            this.projectile.setVelocityX(-350)
                            this.projectile.play("Projectile").once('animationcomplete', ()=>{
                                this.projectile.setVelocity(0)
                                this.projectile.play("Blast").once('animationcomplete', ()=>{
                                    this.projectile.destroy()
                                    if(player.health/player.maxHealth >= 0)
                                    {
                                        this.setMeterPercentageAnimated(player.health/player.maxHealth)
                                    }
                                    else
                                    {
                                        this.setMeterPercentageAnimated(0)
                                    }
                                    if(player.health <= 0)
                                    {
                                        Variables.Victory = false
                                        this.add.text(500,200, "You Lost The Battle")
                                        this.add.text(500, 250, "Respawn").setInteractive().on('pointerdown', () => this.leaveScene())
                                        Variables.money = Variables.money/1.5
                                        AttackButton.destroy()
                                        ItemButton.destroy()
                                        RunButton.destroy()
                                        
                                    }
                                })
                                this.projectile.anims.msPerFrame = 150
                            })
                            this.projectile.anims.msPerFrame = 150
                        }
                        else
                        {
                            this.enemy.play("EnemyAttack", 4, false).once('animationcomplete', () =>{
                                this.enemy.play("EnemyIdle")
                                this.enemy.anims.msPerFrame = 150
                                if(player.health/player.maxHealth >= 0)
                                {
                                    this.setMeterPercentageAnimated(player.health/player.maxHealth)
                                }
                                else
                                {
                                    this.setMeterPercentageAnimated(0)
                               }
                               if(player.health <= 0)
                               {
                                   Variables.Victory = false
                                   this.add.text(500,200, "You Lost The Battle")
                                   this.add.text(500, 250, "Respawn").setInteractive().on('pointerdown', () => this.leaveScene())
                                   Variables.money = Variables.money/1.5
                                   AttackButton.destroy()
                                   ItemButton.destroy()
                                   RunButton.destroy()
                                   
                               }
                            })
                        }
                        

                        this.enemy.anims.msPerFrame = 150

                        AttackButton.text = "Attack"
                        ItemButton.text = "Item"
                        RunButton.text = "Run"
                        
                    }
                })
         
                this.enemy.anims.msPerFrame = 400
        
            }
        })
        
    }

    DeleteAnims()
    {
        this.anims.remove("EnemyAttack")
        this.anims.remove("EnemyIdle")
        this.anims.remove("EnemyHit")
        this.anims.remove("Death")
    }

    ItemButtonClicked(player, smallHealthPotions, healthPotions, largeHealthPotions)
    {
        var ItemBox = this.add.rectangle(505, 420, 300, 150, 0)
        ItemBox.setStrokeStyle(2, 0xffffff);
        let SmallHealthPotionT = this.add.text(357, 355,"Small Health Potion x " + smallHealthPotions.NumberOwned)
        let useSmallHealthPotion = this.add.text(610, 355, "Use").setInteractive().on('pointerdown', () => this.usePotion(smallHealthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions, SmallHealthPotionT, HealthPotionT, LargeHealthPotionT))
        
        let HealthPotionT = this.add.text(357, 395,"Health Potion x " + healthPotions.NumberOwned)
        let useHealthPotion = this.add.text(610, 395, "Use").setInteractive().on('pointerdown', () => this.usePotion(healthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions, SmallHealthPotionT, HealthPotionT, LargeHealthPotionT))

        let LargeHealthPotionT = this.add.text(357, 435,"Large Health Potion x " + largeHealthPotions.NumberOwned)
        let useLargeHealthPotion = this.add.text(610, 435, "Use").setInteractive().on('pointerdown', () => this.usePotion(largeHealthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions, SmallHealthPotionT, HealthPotionT, LargeHealthPotionT))

        let LeaveButton = this.add.text(600, 480, "Close").setInteractive().on('pointerdown', () => this.leaveItemSelect(ItemBox, SmallHealthPotionT, useSmallHealthPotion, HealthPotionT, useHealthPotion, LargeHealthPotionT, useLargeHealthPotion, LeaveButton))
    }



    usePotion(Potion, player, smallHealthPotions, healthPotions, largeHealthPotions, smallHealthPotionT, healthPotionT, largeHealthPotionT)
    {
        if(Potion.NumberOwned > 0)
        {
            player.health += player.maxHealth*(Potion.HealthRecovery/100)
            Potion.NumberOwned--
        }
        else
        {
            console.log("You have no more potions left")
        }
        if(player.health > player.maxHealth)
        {
            player.Health = player.maxHealth
        }
        console.log(player.health)
        smallHealthPotionT.text = "Small Health Potion x " + smallHealthPotions.NumberOwned
        healthPotionT.text = "Health Potion x " + healthPotions.NumberOwned
        largeHealthPotionT.text = "Large Health Potion x " + largeHealthPotions.NumberOwned
    }

    leaveItemSelect(ItemBox, SmallHealthPotionT, useSmallHealthPotion, HealthPotionT, useHealthPotion, LargeHealthPotionT, useLargeHealthPotion, LeaveButton)
    {
        ItemBox.destroy()
        SmallHealthPotionT.destroy()
        useSmallHealthPotion.destroy()
        HealthPotionT.destroy()
        useHealthPotion.destroy()
        LargeHealthPotionT.destroy()
        useLargeHealthPotion.destroy()
        LeaveButton.destroy()

    }

    RunButtonClicked(enemy, player)
    {
        var random = Math.floor(Math.random() * 4);
        console.log(random)
        if(random != 1)
        {
            let leaveButton = ""
            this.leaveScene()
        }
        else
        {
            window.confirm("Failed To Run")
        }
        player.health -= enemy.attack
    }

    leaveScene()
    {

        if(Variables.currentFloor == 1)
        {
            this.scene.switch("scene-game")
        }
        else if (Variables.currentFloor == 2)
        {
            this.scene.switch("scene-game-floor2")
        }
        else if (Variables.currentFloor == 3)
        {
            this.scene.switch("scene-game-floor3")
        }
        else if (Variables.currentFloor == 4)
        {
            this.scene.switch("scene-game-floor4")
        }
        else if (Variables.currentFloor == 5)
        {
            this.scene.switch("scene-game-floor5")
        }
        this.scene.stop()
    }
    update()
    {

    }
}