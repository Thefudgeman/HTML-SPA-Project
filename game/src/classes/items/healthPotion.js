import {Item} from "./item"

export class HealthPotion extends Item{

    healthRecovery = 0

    get healthRecovery()
    {
        return this.healthRecovery
    }
    set healthRecovery(value)
    {
        this.healthRecovery = value
    }

    constructor(Description, NumberOwned, PotionName)
    {
        super()
        this.healthRecovery = 50
        super.itemDescription = Description
        super.numberOwned = NumberOwned
        super.itemName = PotionName
    }
}