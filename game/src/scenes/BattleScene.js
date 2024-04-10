import { Player } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/player.js'
import { Entity } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/entity.js'
import {Slime} from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/slime.js'
import { Weapon } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/weapon.js'
import { Sword } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/Sword.js'
import { WarriorArmour } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Armour/WarriorArmour.js'
import { Variables }from '/Users/theob/dev/HTML-SPA-Project/game/src/scenes/Maingame.js'
import { SmallHealthPotion } from '../classes/items/Potions/smallHealthPotion.js'
import { HealthPotion } from '../classes/items/Potions/healthPotion.js'
import { LargeHealthPotion } from '../classes/items/Potions/largeHealthPotion.js'

var created = false

export default class battleScene extends Phaser.Scene{
    constructor(){
        super("scene-battle")
    }
    
    preload()
    {
        this.load.image("map2", "src/assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
        this.load.spritesheet("DungeonMasterDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Dungeon Master Death.png", 
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
        this.load.spritesheet("GoblinKingProjectile", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Projectile 1.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("GoblinKingBlast", "./src/assets/Roguelike Dungeon - Asset Bundle/Goblin King Blast 1.png", 
        {
            frameWidth:320,
            frameHeight:320
        })
        this.load.spritesheet("SkeletonKingDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Skeleton King Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
        this.load.spritesheet("SlimeKingDeath", "./src/assets/Roguelike Dungeon - Asset Bundle/Slime King Death.png", 
        {
            frameWidth:320,
            frameHeight:160
        })
    }
    create()
    {

      const slime = new Slime();
      const player = new Player("name", 50, 100, 50, 1);
      const sword = new Sword("Sword", "this is a sword", 20, 1)
      const armour = new WarriorArmour("Armour", "this is armour", 10, 1)
      const smallHealthPotions = new SmallHealthPotion("Restores 25% of your health", 15, "Small Health Potion")
      const healthPotions = new HealthPotion("Restores 50% of your health", 15, "Health Potion")
      const largeHealthPotions = new LargeHealthPotion("Restores 75% of your health", 15, "Large Health Potion")
      this.map = this.add.image(0,0,"map2").setOrigin(0,0)
      
      let AttackButton = this.add.text(430,300,"Attack").setInteractive().on('pointerdown', () => this.AttackButtonClicked(slime, player, AttackButton, ItemButton, RunButton, sword, armour))

      
      let ItemButton = this.add.text(498,300,"Item").setInteractive().on('pointerdown', () => this.ItemButtonClicked(player, smallHealthPotions, healthPotions, largeHealthPotions))

      
        let RunButton = this.add.text(550,300,"Run").setInteractive().on('pointerdown', () => this.RunButtonClicked(slime, player))
        if(created == false)
        {
            this.anims.create({
                key:"slimeDie",
                frames:this.anims.generateFrameNumbers("slime", {frames:[28,29,30,31, 32]}),
                framerate:16,
                repeat:0
            })
            this.anims.create({
                key:"Death",
                frames:this.anims.generateFrameNumbers("DungeonMasterDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
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
            this.anims.create({
                key:"Death",
                frames:this.anims.generateFrameNumbers("GoblinKingDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
            })
            this.anims.create({
                key:"Projectile",
                frames:this.anims.generateFrameNumbers("GoblinKingProjectile", ),
                repeat:-1
            })
            this.anims.create({
                key:"Blast",
                frames:this.anims.generateFrameNumbers("GoblinKingBlast", ),
                repeat:-1
            })
            this.anims.create({
                key:"Death",
                frames:this.anims.generateFrameNumbers("SkeletonKingDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
            })
            this.anims.create({
                key:"Death",
                frames:this.anims.generateFrameNumbers("SlimeKingDeath", {frames:[12,13,14,15,16,17,18,19,20,21,22,23]})
            })
            created = true
        }
        this.projectile = this.add.sprite(500,500, "DungeonMasterProjectile")
        this.projectile.play("Projectile", true)
        this.slime = this.add.sprite(700,200, "slime")
        this.player = this.add.sprite(300,200, "player")
        this.player.play("idleRight", true)
        this.player.anims.msPerFrame = 100
        this.slime.setFlipX(true)
        this.slime.play("idle", true)
        this.slime.anims.msPerFrame = 100
    }

    AttackButtonClicked(slime, player, AttackButton, ItemButton, RunButton, sword, armour)
    {
        slime.health = slime.health - player.attack - sword.damage;
        this.player.play("attackRight", 4,false)
        this.player.anims.msPerFrame = 100
        if(slime.health <= 0)
        {
            slime.health = 0
            this.slime.play("slimeDie", false)
            this.slime.anims.msPerFrame = 200
            AttackButton.destroy()
            ItemButton.destroy()
            RunButton.destroy()
            Variables.money += slime.moneyDrop
            this.add.text(500,200,"You Won The Battle");
            this.add.text(500, 250, "Leave").setInteractive().on('pointerdown', () => this.leaveScene())
        }
        else
        {
            if(player.defence + armour.defence > slime.attack)
            {
                player.health = player.health
            }
            else
            {
                player.health = player.health - slime.attack + player.defence + armour.defence
            }
        }
        if(player.health <= 0)
        {
            Variables.battle = false
            Variables.battle2 = false
            Variables.battle3 = false
            this.add.text(500,200, "You Lost The Battle")
            this.add.text(500, 250, "Leave").setInteractive().on('pointerdown', () => this.leaveScene())
            AttackButton.destroy()
            ItemButton.destroy()
            RunButton.destroy()
            
        }
    }

    ItemButtonClicked(player, smallHealthPotions, healthPotions, largeHealthPotions)
    {
        var ItemBox = this.add.rectangle(505, 420, 300, 150, 0)
        ItemBox.setStrokeStyle(2, 0xffffff);
        let SmallHealthPotionT = this.add.text(357, 355,"Small Health Potion x " + smallHealthPotions.NumberOwned)
        let useSmallHealthPotion = this.add.text(610, 355, "Use").setInteractive().on('pointerdown', () => this.usePotion(smallHealthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions))
        
        let HealthPotionT = this.add.text(357, 395,"Health Potion x " + healthPotions.NumberOwned)
        let useHealthPotion = this.add.text(610, 395, "Use").setInteractive().on('pointerdown', () => this.usePotion(healthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions))

        let LargeHealthPotionT = this.add.text(357, 435,"Large Health Potion x " + largeHealthPotions.NumberOwned)
        let useLargeHealthPotion = this.add.text(610, 435, "Use").setInteractive().on('pointerdown', () => this.usePotion(largeHealthPotions, player, smallHealthPotions, healthPotions, largeHealthPotions))

        let LeaveButton = this.add.text(600, 480, "Close").setInteractive().on('pointerdown', () => this.leaveItemSelect(ItemBox, SmallHealthPotionT, useSmallHealthPotion, HealthPotionT, useHealthPotion, LargeHealthPotionT, useLargeHealthPotion, LeaveButton))
    }

    usePotion(Potion, player, smallHealthPotions, healthPotions, largeHealthPotions)
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
        this.ItemButtonClicked(player, smallHealthPotions, healthPotions, largeHealthPotions)
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

    RunButtonClicked(slime, player)
    {
        var random = Math.floor(Math.random() * 4);
        console.log(random)
        if(random != 1)
        {
            this.leaveScene()
        }
        else
        {
            window.confirm("Failed To Run")
        }
        player.health -= slime.attack
    }

    leaveScene()
    {
        this.scene.start("scene-game")
        this.scene.stop()
    }
    update()
    {

    }
}