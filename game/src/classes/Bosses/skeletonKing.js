import {Entity} from '../entity.js'

export class SkeletonKing extends Entity
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
        super.name = "SkeletonKing";
        super.attack = 400;
        super.defence = 150;
        super.health = 3000;
        this.moneyDrop = 1500;
        this.xpDrop = 6000;
    }
}