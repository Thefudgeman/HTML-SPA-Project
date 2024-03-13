import { Player } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/player.js'
import { Entity } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/entity.js'
import {Slime} from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/slime.js'
import { Weapon } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/weapon.js'
import { Sword } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/Sword.js'
import { WarriorArmour } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Armour/WarriorArmour.js'
import { Variables }from '/Users/theob/dev/HTML-SPA-Project/game/src/scenes/Maingame.js'

var created = false

export default class battleScene extends Phaser.Scene{
    constructor(){
        super("scene-battle")
    }
    preload()
    {
        this.load.image("map2", "src/assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
    }
    create()
    {
      const slime = new Slime();
      const player = new Player("name", 50, 100, 50, 1);
      const sword = new Sword("Sword", "this is a sword", 20, 1)
      const armour = new WarriorArmour("Armour", "this is armour", 10, 1)
      this.map = this.add.image(0,0,"map2").setOrigin(0,0)
      
      let AttackButton = this.add.text(430,300,"Attack").setInteractive().on('pointerdown', () => this.AttackButtonClicked(slime, player, AttackButton, ItemButton, RunButton, sword, armour))

      
      let ItemButton = this.add.text(498,300,"Item")//.setInteractive().on('pointerdown', () => this.battle())

      
        let RunButton = this.add.text(550,300,"Run").setInteractive().on('pointerdown', () => this.RunButtonClicked(slime, player))
        if(created == false)
        {
            this.anims.create({
                key:"slimeDie",
                frames:this.anims.generateFrameNumbers("slime", {frames:[28,29,30,31, 32]}),
                framerate:16,
                repeat:0
            })
            created = true
        }

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
            Variables.battle = true
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
            this.add.text(500,200, "You Lost The Battle")
            this.add.text(500, 250, "Leave").setInteractive().on('pointerdown', () => this.leaveScene())
            AttackButton.destroy()
            ItemButton.destroy()
            RunButton.destroy()
            
        }
    }

    ItemButtonClicked()
    {

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
    }
    update()
    {

    }
}