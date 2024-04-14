import { Sword } from '/Users/theob/dev/HTML-SPA-Project/game/src/classes/items/Weapons/Sword.js'
import {Variables} from '/Users/theob/dev/HTML-SPA-Project/game/src/scenes/Maingame.js'
import { WarriorArmour } from './../classes/items/Armour/WarriorArmour';

import { SmallHealthPotion } from '../classes/items/Potions/smallHealthPotion';
import { HealthPotion } from '../classes/items/Potions/healthPotion';
import { LargeHealthPotion } from '../classes/items/Potions/largeHealthPotion';

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
        if(Variables.moneyButton == false)
        {
            this.moneyText = this.add.text(230, 50, "Money: "+Variables.money)
            Variables.moneyButton = true
        }
        let BuyButton = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, Variables.iron, Variables.steel, Variables.titanium, Variables.smallHealthPotion, Variables.healthPotion, Variables.largeHealthPotion))
        let SellButton = this.add.text(430,300,"Sell").setInteractive().on('pointerdown', () => this.SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, Variables.iron, Variables.steel, Variables.titanium, Variables.smallHealthPotion, Variables.healthPotion, Variables.largeHealthPotion))
        let LeaveButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let UpgradeButton = this.add.text(430,350,"Upgrade").setInteractive().on('pointerdown', () => this.UpgradeButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, Variables.weapon, Variables.armour))

    }

    updateMoney()
    {
        this.moneyText.text =  "Money: "+Variables.money
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


        upgrade : if(Variables.money >= MoneyNeeded)
        {
            if(Variables.armour.level < 11 && MaterialNeeded <= Variables.iron.NumberOwned)
            {
                Variables.iron.NumberOwned -= MaterialNeeded
                Variables.armour.level++
                Variables.money -= MoneyNeeded
            }
            else if(10 < Variables.armour.level && Variables.armour.level < 21)
            {
                MaterialNeeded -= 10
                if (Variables.steel.NumberOwned >= MaterialNeeded)
                {
                    Variables.steel.NumberOwned -= MaterialNeeded
                    Variables.armour.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", Variables.steel.ItemName)
                    break upgrade 
                }
            }
            else if(Variables.armour.level > 20)
            {
                MaterialNeeded -= 20
                if (Variables.titanium.NumberOwned >= MaterialNeeded)
                {
                    Variables.titanium.NumberOwned -= MaterialNeeded
                    Variables.armour.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", Variables.titanium.ItemName)
                    break upgrade 
                }
            }
            else
            {
                console.log("Not enough ", Variables.iron.ItemName)
                break upgrade 
            }

            this.updateMoney()
        }
        else
        {
            console.log("you don't have enough money")
        }

        console.log(Variables.armour.level)
    }

    upgradeWeapon(weapon)
    {
        console.log(Variables.money)
        var MoneyNeeded = Math.round(50*Math.pow(1.3, weapon.level))
        console.log(MoneyNeeded)

        var MaterialNeeded = weapon.level


        upgrade : if(Variables.money >= MoneyNeeded)
        {

            if(weapon.level < 11 && MaterialNeeded <= Variables.iron.NumberOwned)
            {
                Variables.iron.NumberOwned -= MaterialNeeded
                weapon.level++
                Variables.money -= MoneyNeeded
            }
            else if(10 < weapon.level && weapon.level < 21)
            {
                MaterialNeeded -= 10
                if (Variables.steel.NumberOwned >= MaterialNeeded)
                {
                    Variables.steel.NumberOwned -= MaterialNeeded
                    weapon.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", Variables.steel.ItemName)
                    break upgrade 
                }
            }
            else if(weapon.level > 20)
            {
                MaterialNeeded -= 20
                if (Variables.titanium.NumberOwned >= MaterialNeeded)
                {
                    Variablestitanium.NumberOwned -= MaterialNeeded
                    weapon.level++
                    Variables.money -= MoneyNeeded
                }  
                else
                {
                    console.log("Not enough", Variables.titanium.ItemName)
                    break upgrade 
                }
            }
            else
            {
                console.log("Not enough ", Variables.iron.ItemName)
                break upgrade 
            }
            this.updateMoney()
            }
        else
        {
            console.log("you don't have enough money")
        }

        console.log(weapon.level)
    }


    BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, buyIron, buySteel, buyTitanium, buySmallHealthPotion, buyHealthPotion, buyLargeHealthPotion)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        let Buy1 = this.add.text(230,100,"iron                  Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyIron))
        let Buy2 = this.add.text(230,150,"steel                 Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buySteel))
        let Buy3 = this.add.text(230,200,"titanium              Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyTitanium))
        let Buy4 = this.add.text(230,250,"Small health potion   Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buySmallHealthPotion))
        let Buy5 = this.add.text(230,300,"Health potion         Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyHealthPotion))
        let Buy6 = this.add.text(230,350,"Large health potion   Buy").setInteractive().on('pointerdown', () => this.buyMaterial(buyLargeHealthPotion))
        console.log(buyLargeHealthPotion.NumberOwned)
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Buy1, Buy2, Buy3, Buy4, Buy5, Buy6, LeaveBuyButton))


    }

    buyMaterial(material)
    {

        console.log(material.ItemName)
        if(Variables.money >= material.cost)
        {
            Variables.money -=material.cost
            material.NumberOwned++
            this.updateMoney()
        }
        else
        {
            console.log("You don't have enough money")
        }
    }

    sellMaterial(material)
    {
        if(material.NumberOwned > 0)
        {
            Variables.money += material.cost
            material.NumberOwned--
            this.updateMoney()
        }
        else
        {
            console.log("You don't have enough " + material.ItemName)
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

    SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton, materialIron, materialSteel, materialTitanium, smallHealthPotion, healthPotion, largeHealthPotion)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Sell1 = this.add.text(230,100,"Iron                  Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialIron))
        let Sell2 = this.add.text(230,150,"Steel                 Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialSteel))
        let Sell3 = this.add.text(230,200,"Titanium              Sell").setInteractive().on('pointerdown', () => this.sellMaterial(materialTitanium))
        let Sell4 = this.add.text(230,250,"Small health potion   Sell").setInteractive().on('pointerdown', () => this.sellMaterial(smallHealthPotion))
        let Sell5 = this.add.text(230,300,"Health potion         Sell").setInteractive().on('pointerdown', () => this.sellMaterial(healthPotion))
        let Sell6 = this.add.text(230,350,"Large health potion   Sell").setInteractive().on('pointerdown', () => this.sellMaterial(largeHealthPotion))
        console.log(largeHealthPotion.NumberOwned)
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Sell1, Sell2, Sell3, Sell4, Sell5, Sell6, LeaveBuyButton))


    }

    LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
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
        else if(Variables.currentFloor == 4)
        {
            this.scene.switch("scene-game-floor4")
        }
        else if(Variables.currentFloor == 5)
        {
            this.scene.switch("scene-game-floor5")
        }
        
    }

    update()
    {

    }
}