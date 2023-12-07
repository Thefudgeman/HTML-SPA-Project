export class Entity
{
    name = ""
    health = 0
    attack = 30
    defence = 0

    get name()
    {
        return this.name
    }

    get health()
    {
        return this.health
    }

    get attack()
    {
        return this.attack
    }

    get defence()
    {
        return this.defence
    }
    set name(value)
    {
        this.name = value
    }
    set attack(value)
    {
        this.attack = value
    }
    set health(value)
    {
        this.health = value
    }
    set defence(value)
    {
        this.defence = value
    }
    

    constructor(Name, Health, Attack, Defence)
    {
        Name = this.name
        Health = this.health
        Attack = this.attack
        Defence = this.defence
    }
}