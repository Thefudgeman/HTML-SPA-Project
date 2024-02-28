
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

        let BuyButton = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let SellButton = this.add.text(430,300,"Sell").setInteractive().on('pointerdown', () => this.SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let LeaveButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))
        let UpgradeButton = this.add.text(430,350,"Upgrade").setInteractive().on('pointerdown', () => this.UpgradeButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton))

    }

    DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {
        BuyButton.destroy()
        SellButton.destroy()
        LeaveButton.destroy()
        UpgradeButton.destroy()
    }


    UpgradeButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        let UpgradeWeapon = this.add.text(230,300, "Upgrade Weapon").setInteractive().on('pointerdown', () =>this.upgradeWeapon())

    }

    upgradeWeapon()
    {
        
    }

    BuyButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Buy1 = this.add.text(230,100,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy2 = this.add.text(230,150,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy3 = this.add.text(230,200,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy4 = this.add.text(230,250,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy5 = this.add.text(230,300,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Buy6 = this.add.text(230,350,"Buy").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Buy1, Buy2, Buy3, Buy4, Buy5, Buy6, LeaveBuyButton))


    }

    LeaveBuyButtonClicked(Buy1, Buy2, Buy3, Buy4, Buy5, Buy6, LeaveBuyButton)
    {
        Buy1.destroy()
        Buy2.destroy()
        Buy3.destroy()
        Buy4.destroy()
        Buy5.destroy()
        Buy6.destroy()
        LeaveBuyButton.destroy()

        this.create()

    }

    SellButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)

        let Sell1 = this.add.text(230,100,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell2 = this.add.text(230,150,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell3 = this.add.text(230,200,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell4 = this.add.text(230,250,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell5 = this.add.text(230,300,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let Sell6 = this.add.text(230,350,"Sell").setInteractive().on('pointerdown', () => this.BuyButtonClicked())
        let LeaveBuyButton = this.add.text(630,300,"Leave").setInteractive().on('pointerdown', () => this.LeaveBuyButtonClicked(Sell1, Sell2, Sell3, Sell4, Sell5, Sell6, LeaveBuyButton))


    }

    LeaveButtonClicked(BuyButton, SellButton, LeaveButton, UpgradeButton)
    {   
        this.DestroyButtons(BuyButton, SellButton, LeaveButton, UpgradeButton)
        this.scene.start("scene-game")
    }

    update()
    {

    }
}