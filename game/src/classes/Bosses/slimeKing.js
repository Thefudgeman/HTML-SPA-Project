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
        super.attack = 50;
        super.defence = 40;
        super.health = 500;
        this.moneyDrop = 400;
        this.xpDrop = 1000;
    }
}