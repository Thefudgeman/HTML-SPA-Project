import { Item } from '../item'

export class titanium extends Item{

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

    constructor(ItemName, ItemDescription, NumberOwned)
    {
        super()
        super.itemName = ItemName
        super.itemDescription = ItemDescription
        super.numberOwned = NumberOwned
    }
}