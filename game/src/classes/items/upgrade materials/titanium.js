import { Item } from '../item'

export class titanium extends Item{

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