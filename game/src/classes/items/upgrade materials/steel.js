import { Item } from '../item'

export class Steel extends Item{
    cost = 0
    set NumberOwned(value)
    {
        super.numberOwned = value
    }

    get NumberOwned()
    {
        return super.numberOwned
    }

    get ItemName()
    {
        return super.itemName
    }

    set ItemName(value)
    {
        super.itemName = value
    }

    get cost()
    {
        return this.cost
    }

    set cost(value)
    {
        this.cost = value
    }

    constructor(ItemDescription, NumberOwned)
    {
        super()
        super.itemName = "Steel"
        super.itemDescription = ItemDescription
        super.numberOwned = NumberOwned
        this.cost = 40
    }
}