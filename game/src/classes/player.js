import {Entity} from './entity.js'

export class Player extends Entity
{
    level = 1;
    xp = 0;
    xpToNextLevel = 100


    set xpToNextLevel(value)
    {
        this.xpToNextLevel = value
    }
    set xp(value)
    {
        this.xp = value
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
    get xp()
    {
        return this.xp
    }
    get xpToNextLevel()
    {
        return this.xpToNextLevel
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
      super.attack = Attack
      super.name = Name
      super.health = Health
      super.defence = Defence
      this.level = Level
      this.maxHealth = Health
    }
}