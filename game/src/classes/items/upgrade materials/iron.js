import { Item } from '../item'

export class iron extends Item{

    get NumberOwned()
    {
        return super.numberOwned
    }

    set NumberOwned(value)
    {
        super.numberOwned = value
    }

    constructor(ItemName, ItemDescription, NumberOwned)
    {
        super()
        super.itemName = ItemName
        super.itemDescription = ItemDescription
        super.numberOwned = NumberOwned
    }
}