import { Item } from './items/item.js'

export class upgradeMaterial1 extends Item{

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