import { Armour } from "./armour";

export class WarriorArmour extends Armour
{
    level = 1

    get Level()
    {
        return this.level
    }

    set Level(value)
    {
        this.level = value
    }

    constructor(ArmourName, ArmourDescription, Defence, Level)
    {
        super()
        super.itemName = ArmourName
        super.itemDescription = ArmourDescription
        super.defence = Defence
        this.level = Level
    }
}