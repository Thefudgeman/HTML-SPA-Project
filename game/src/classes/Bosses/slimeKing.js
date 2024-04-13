import {Entity} from '../entity'

export class SlimeKing extends Entity
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
        super.name = "SlimeKing";
        super.attack = 1000000;
        super.defence = 50000;
        super.health = 999;
        this.moneyDrop = 5000000;
        this.xpDrop = 20000000;
    }
}