import {Entity} from '../entity.js'

export class DungeonMaster extends Entity
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
        super.name = "DungeonMaster";
        super.attack = 500;
        super.defence = 300;
        super.health = 6000;
        this.moneyDrop = 5000;
        this.xpDrop = 20000;
    }
}