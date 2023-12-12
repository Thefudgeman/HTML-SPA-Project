import {Entity} from './entity.js'

export class Slime extends Entity
{
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
    }
}