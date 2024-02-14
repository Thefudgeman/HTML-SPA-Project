import { Weapon } from "./weapon";

export class Bow extends Weapon
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

    constructor(WeaponName, WeaponDescription, Damage, Level)
    {
        super()
        super.damage = Damage
        super.itemName = WeaponName
        super.itemDescription = WeaponDescription
        this.level = Level
    }
}