class sprite
{
    constructor(speed, animation)
    {
        this.animation = animation;
        this.speed = speed;
        this.index
    }

    show()
    {
        image(this.animation[this.index % this.animation.length], 0,0)
    }

    animate()
    {
        this.index += this.speed;
    }
}