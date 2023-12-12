import {Entity} from './entity.js'

export class Player extends Entity
{
    level = 1;
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
    get Level()
    {
        return this.level
    }
    set Level(value)
    {
        this.level = value
    }
    constructor(Name, Health, Attack, Defence, Level)
    {
        super()
       // Attack = super.attack
      //  Name = super.name
      //  Health =super.health
      //  Defence = super.defence
      super.attack = Attack
      super.name = Name
      super.health = Health
      super.defence = Defence
      this.level = Level
    }
}