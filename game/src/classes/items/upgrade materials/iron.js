import { Item } from '../item'

export class iron extends Item{
    cost = 0
    get NumberOwned()
    {
        return super.numberOwned
    }

    get cost()
    {
        return this.cost
    }

    set cost(value)
    {
        this.cost = value
    }

    set NumberOwned(value)
    {
        super.numberOwned = value
    }

    get ItemName()
    {
        return super.itemName
    }

    set ItemName(value)
    {
        super.itemName = value
    }


    constructor(ItemDescription, NumberOwned)
    {
        super()
        super.itemName = "Iron"
        super.itemDescription = ItemDescription
        super.numberOwned = NumberOwned
        this.cost = 20
    }
}