import {Entity} from '../entity.js'

export class Slime extends Entity
{
    moneyDrop;
    xpDrop;
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
        super.attack = 10;
        super.defence = 5;
        super.health = 50;
        this.moneyDrop = 5;
        this.xpDrop = 20;
    }
}