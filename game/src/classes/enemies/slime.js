import {Entity} from '../entity.js'

export class Slime extends Entity
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
        super.name = "Slime";
        super.attack = 20;
        super.defence = 5;
        super.health = 100;
        this.maxHealth = 100;
        this.moneyDrop = 20;
        this.xpDrop = 60;
    }
}