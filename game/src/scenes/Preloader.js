import Phaser from "phaser"

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super("preloader")
    }

    preload()
    {
        this.load.image("tiles", "src/assets/Dungeon_tiles.png")
        this.load.tilemapTiledJSON('dungeon', "src/assets/newmapdonet3.JSON")
    }
    create()
    {
        this.add.image(0, 0, "tiles")
        this.scene.start("scene-game")
    }
}