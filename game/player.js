import {Entity} from './entity.js'

export class Player extends Entity
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
    constructor(Name, Health, Attack, Defence)
    {
        super()
        Attack = super.attack
        Name = super.name
        Health =super.health
        Defence = super.defence
    }
}