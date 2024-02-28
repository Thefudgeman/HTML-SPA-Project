
export default class shopScene extends Phaser.Scene{
    constructor(){
        super("scene-shop")
    }
    preload()
    {
        this.load.image("shop", "src/assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
    }

    create()
    {
        this.add.image(0,0,"shop").setOrigin(0,0)

        let BuyButton = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked(BuyButton, SellButton, LeaveButton))
        let SellButton = this.add.text(430,300,"Sell").setInteractive().on('pointerdown', () => this.SellButtonClicked())
        let LeaveButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveButtonClicked())


    }

    BuyButtonClicked(BuyButton, SellButton, LeaveButton)
    {   
        BuyButton.destroy()
        SellButton.destroy()
        LeaveButton.destroy()

        this.add.text(230,100,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        this.add.text(230,150,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        this.add.text(230,200,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        this.add.text(230,250,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        this.add.text(230,350,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
    }

    SellButtonClicked()
    {

    }

    LeaveButtonClicked()
    {
        this.scene.start("scene-game")
    }

    update()
    {

    }
}