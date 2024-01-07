import {Item} from "./item"

export class Armour extends Item{

    defence = 0

    get defence()
    {
        return this.defence
    }
    set defence(value)
    {
        this.defence = value
    }

    constructor(ArmourName, ArmourDescription, NumberOwned, Defence)
    {
        super()
        super.itemName = ArmourName
        super.itemDescription = ArmourDescription
        super.numberOwned = NumberOwned
        this.defence = Defence
    }
}