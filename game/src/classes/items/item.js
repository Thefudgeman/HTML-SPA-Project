export class Item{

    itemName = ""
    itemDescription = ""
    numberOwned = 0

    get itemName()
    {
        return this.itemName
    }
    get itemDescription()
    {
        return this.itemDescription
    }
    get numberOwned()
    {
        return this.numberOwned
    }
    set itemName(value)
    {
        this.itemName = value
    }
    set itemDescription(value)
    {
        this.itemDescription = value
    }
    set numberOwned(value)
    {
        this.numberOwned = value
    }

    constructor(ItemName, ItemDescription, NumberOwned)
    {
        this.itemName = ItemName
        this.itemDescription = ItemDescription
        this.numberOwned = NumberOwned
    }
}