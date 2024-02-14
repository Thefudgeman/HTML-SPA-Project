import { Item } from '../item';

export class Weapon extends Item{

    damage = 0;

    get Damage()
    {
        return this.damage
    }
    set Damage(value)
    {
        this.damage = value
    }

    constructor(WeaponName, WeaponDescription, Damage, NumberOwned)
    {
        super()
        this.damage = Damage
        super.itemName = WeaponName
        super.itemDescription = WeaponDescription
        super.numberOwned = NumberOwned
    }
}
