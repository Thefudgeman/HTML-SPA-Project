import { Sword } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/Sword.js'
import {Variables} from '/Users/theob/dev/HTML-SPA-Project/game/src/scenes/Maingame.js'
import { WarriorArmour } from './../classes/items/Armour/WarriorArmour';
import { iron } from '../classes/items/upgrade materials/iron';
import { steel } from '../classes/items/upgrade materials/steel'
import { titanium } from '../classes/items/upgrade materials/titanium'


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
        let materialIron = new iron ("Iron", "description", 20)
        let materialSteel = new steel ("Steel", "description", 20)
        let materialTitanium = new titanium ("Titanium", "description", 20)

        console.log(materialIron.ItemName)

        let BuyButton = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, materialIron, materialSteel, materialTitanium))
        let SellButton = this.add.text(430,300,"Sell").setInteractive().on('pointerdown', () => this.SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, materialIron, materialSteel, materialTitanium))
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

        let ironUpgrade = new iron("Iron", "description", 20)
        let steelUpgrade = new iron("Steel", "description", 20)
        let titaniumUpgrade = new iron("Titanium", "description", 20)


        upgrade : if(Variables.money >= MoneyNeeded)
        {
            if(armour.level < 11 && MaterialNeeded <= ironUpgrade.NumberOwned)
            {
                ironUpgrade.NumberOwned -= MaterialNeeded
                armour.level++
                Variables.money -= MoneyNeeded
            }
            else if(10 < armour.level && armour.level < 21)
            {
                MaterialNeeded -= 10
                if (steelUpgrade.NumberOwned >= MaterialNeeded)
                {
                    steelUpgrade.NumberOwned -= MaterialNeeded
                    armour.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", steelUpgrade.ItemName)
                    break upgrade 
                }
            }
            else if(armour.level > 20)
            {
                MaterialNeeded -= 20
                if (titaniumUpgrade.NumberOwned >= MaterialNeeded)
                {
                    titaniumUpgrade.NumberOwned -= MaterialNeeded
                    armour.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", titaniumUpgrade.ItemName)
                    break upgrade 
                }
            }
            else
            {
                console.log("Not enough ", ironUpgrade.ItemName)
                break upgrade 
            }

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
                weapon.level++
                Variables.money -= MoneyNeeded
            }
            else if(10 < weapon.level && weapon.level < 21)
            {
                MaterialNeeded -= 10
                if (steelUpgrade.NumberOwned >= MaterialNeeded)
                {
                    steelUpgrade.NumberOwned -= MaterialNeeded
                    weapon.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", steelUpgrade.ItemName)
                    break upgrade 
                }
            }
            else if(weapon.level > 20)
            {
                MaterialNeeded -= 20
                if (titaniumUpgrade.NumberOwned >= MaterialNeeded)
                {
                    titaniumUpgrade.NumberOwned -= MaterialNeeded
                    weapon.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", titaniumUpgrade.ItemName)
                    break upgrade 
                }
            }
            else
            {
                console.log("Not enough ", ironUpgrade.ItemName)
                break upgrade 
            }

            console.log(Variables.money)
        }
        else
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
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Buy1, Buy2, Buy3, LeaveBuyButton))


    }

    buyMaterial(material)
    {

        console.log(material.ItemName)
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

    sellMaterial(material)
    {
        if(material.ItemName == "Iron" && material.NumberOwned > 0)
        {
            Variables.money += 15
            material.NumberOwned--
            console.log(material.NumberOwned)
            console.log(Variables.money)
        }
        else if(material.ItemName == "Steel" && material.NumberOwned > 0)
        {
            Variables.money += 30
            material.NumberOwned--
            console.log(material.NumberOwned)
            console.log(Variables.money)
        }
        else if(material.ItemName == "Titanium" && material.NumberOwned > 0)
        {
            Variables.money += 60
            material.NumberOwned--
            console.log(material.NumberOwned)
            console.log(Variables.money)
        }
        else
        {
            console.log("You don't have enough of tht material to sell")
        }
    }



    LeaveBuyButtonClicked(Buy1, Buy2, Buy3, LeaveBuyButton)
    {
        Buy1.destroy()
        Buy2.destroy()
        Buy3.destroy()
        LeaveBuyButton.destroy()

        this.create()

    }

    SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, materialIron, materialSteel, materialTitanium)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Sell1 = this.add.text(230,100,"Iron      Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialIron))
        let Sell2 = this.add.text(230,150,"Steel     Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialSteel))
        let Sell3 = this.add.text(230,200,"Titanium  Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialTitanium))
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Sell1, Sell2, Sell3, LeaveBuyButton))


    }

    LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        if(Variables.currentFloor == 1)
        {
            this.scene.start("scene-game")
        }
        else if (Variables.currentFloor == 2)
        {
            this.scene.start("scene-game-floor2")
        }
        else if (Variables.currentFloor == 3)
        {
            this.scene.start("scene-game-floor3")
        }
        
    }

    update()
    {

    }
}