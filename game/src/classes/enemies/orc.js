import {Entity} from '../entity.js'

export class Orc extends Entity
{
    moneyDrop;
    xpDrop;
    maxHealth;
    get maxHealth()
    {
        return this.maxHealth;
    }
    set xpDrop(value)
    {
        this.xpDrop = value
    }
    set moneyDrop(value)
    {
        this.moneyDrop = value
    }
    set Name(value)
    {
        super.name = value
    }
    set Attack(value)
    {
        super.attack = value
    }
    set Health(value)
    {
        super.health = value
    }
    set Defence(value)
    {
        super.defence = value
    }

    constructor()
    {
        super()
        super.name = "Orc";
        super.attack = 35;
        super.defence = 15;
        super.health = 200;
        this.maxHealth = 200;
        this.moneyDrop = 50;
        this.xpDrop = 120;
    }
}