import {Item} from "../item"

export class HealthPotion extends Item{

    healthRecovery = 0

    get HealthRecovery()
    {
        return this.healthRecovery
    }
    set HealthRecovery(value)
    {
        this.healthRecovery = value
    }

    get NumberOwned()
    {
        return super.numberOwned
    }
    set NumberOwned(value)
    {
        super.numberOwned = value
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