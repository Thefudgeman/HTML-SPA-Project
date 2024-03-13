import { Sword } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/Sword.js'
import {Variables} from '/Users/theob/dev/HTML-SPA-Project/game/src/scenes/Maingame.js'
import { WarriorArmour } from './../classes/items/Armour/WarriorArmour';
import { iron } from '../classes/items/upgrade materials/iron';


export default class shopScene extends Phaser.Scene{
    constructor(){
        super("scene-shop")
    }
    preload()
    {
        this.load.image("shop", "src/assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
    }

    create()
    {
        this.add.image(0,0,"shop").setOrigin(0,0)


        let weapon = new Sword("sword", "description", 50, 1)
        let armour = new WarriorArmour("armour", "description", 30, 1)
        let buyIron = new iron ("Iron", "description", 20)
        let buySteel = new iron ("Steel", "description", 20)
        let buyTitanium = new iron ("Titanium", "description", 20)


        let BuyButton = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, buyIron, buySteel, buyTitanium))
        let SellButton = this.add.text(430,300,"Sell").setInteractive().on('pointerdown', () => this.SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let LeaveButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let UpgradeButton = this.add.text(430,350,"Upgrade").setInteractive().on('pointerdown', () => this.UpgradeButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, weapon, armour))

    }

    DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {
        BuyButton.destroy()
        SellButton.destroy()
        LeaveButton.destroy()
        UpgradeButton.destroy()
    }


    UpgradeButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, weapon, armour)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        let UpgradeWeapon = this.add.text(230,300, "Upgrade Weapon").setInteractive().on('pointerdown', () =>this.upgradeWeapon(weapon))
        let UpgradeArmour = this.add.text(230, 350, "Upgrade Armour").setInteractive().on('pointerdown', () =>this.upgradeArmour(armour))
        let LeaveUpgradeButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveUpgradeClicked(UpgradeWeapon, LeaveUpgradeButton, UpgradeArmour))

    }

    LeaveUpgradeClicked(UpgradeWeapon, LeaveUpgradeButton, UpgradeArmour)
    {
        UpgradeWeapon.destroy()
        LeaveUpgradeButton.destroy()
        UpgradeArmour.destroy()
        this.create()
    }

    upgradeArmour(armour)
    {
        var MoneyNeeded = Math.round(100*Math.pow(1.3, armour.level))

        var MaterialNeeded = armour.level

        let ironUpgrade = new iron("material1", "description", 20)


        upgrade : if(Variables.money >= MoneyNeeded)
        {
            if(armour.level < 11 && MaterialNeeded <= ironUpgrade.NumberOwned)
            {
                ironUpgrade.NumberOwned -= MaterialNeeded
            }
            else if(10 < armour.level && armour.level < 21)
            {

            }
            else if(armour.level > 20)
            {

            }
            else
            {
                console.log("Not enough upgrade materials")
                break upgrade 
            }

            armour.level++
            Varlaibles.money -= MoneyNeeded
            console.log(Variables.money)
        }
        else
        {
            console.log("you don't have enough money")
        }

        console.log(armour.level)
    }

    upgradeWeapon(weapon)
    {
        console.log(Variables.money)
        var MoneyNeeded = Math.round(50*Math.pow(1.3, weapon.level))
        console.log(MoneyNeeded)

        var MaterialNeeded = weapon.level

        let ironUpgrade = new iron("material1", "description", 20)


        upgrade : if(Variables.money >= MoneyNeeded)
        {

            if(weapon.level < 11 && MaterialNeeded <= ironUpgrade.NumberOwned)
            {
                ironUpgrade.NumberOwned -= MaterialNeeded
            }
            else if(10 < weapon.level && weapon.level < 21)
            {

            }
            else if(weapon.level > 20)
            {
                
            }
            else
            {
                console.log("Not enough upgrade materials")
                break upgrade 
            }

            weapon.level++
            Variables.money -= MoneyNeeded
            console.log(Variables.money)
        }
        else if(Variables.money < MoneyNeeded)
        {
            console.log("you don't have enough money")
        }

        console.log(weapon.level)
    }


    BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, buyIron, buySteel, buyTitanium)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Buy1 = this.add.text(230,100,"iron      Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyIron))
        let Buy2 = this.add.text(230,150,"steel     Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buySteel))
        let Buy3 = this.add.text(230,200,"titanium  Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyTitanium))
        let Buy4 = this.add.text(230,250,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy5 = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy6 = this.add.text(230,350,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Buy1, Buy2, Buy3, Buy4, Buy5, Buy6, LeaveBuyButton))


    }

    buyMaterial(material)
    {
        if(material.ItemName == "Iron" && Variables.money >= 20)
        {
            Variables.money -= 20
            material.NumberOwned++
            console.log(material.NumberOwned)
        }
        else if(material.ItemName == "Steel" && Variables.money >= 40)
        {
            Variables.money -= 40
            material.NumberOwned++
            console.log(material.NumberOwned)
        }
        else if(material.ItemName == "Titanium" && Variables.money >= 80)
        {
            Variables.money -= 80
            material.NumberOwned++
            console.log(material.NumberOwned)
        }
        else
        {
            console.log("You don't have enough money")
        }
    }



    LeaveBuyButtonClicked(Buy1, Buy2, Buy3, Buy4, Buy5, Buy6, LeaveBuyButton)
    {
        Buy1.destroy()
        Buy2.destroy()
        Buy3.destroy()
        Buy4.destroy()
        Buy5.destroy()
        Buy6.destroy()
        LeaveBuyButton.destroy()

        this.create()

    }

    SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Sell1 = this.add.text(230,100,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell2 = this.add.text(230,150,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell3 = this.add.text(230,200,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell4 = this.add.text(230,250,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell5 = this.add.text(230,300,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell6 = this.add.text(230,350,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Sell1, Sell2, Sell3, Sell4, Sell5, Sell6, LeaveBuyButton))


    }

    LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        this.scene.start("scene-game")
    }

    update()
    {

    }
}