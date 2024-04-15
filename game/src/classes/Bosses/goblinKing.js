import {Entity} from '../entity'

export class GoblinKing extends Entity
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
        super.name = "GoblinKing";
        super.attack = 300;
        super.defence = 80;
        super.health = 1000;
        this.moneyDrop = 800;
        this.xpDrop = 2000;
    }
}