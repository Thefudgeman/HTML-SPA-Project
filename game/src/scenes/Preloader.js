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
        this.load.tilemapTiledJSON('dungeon', "src/assets/newmapdonet6.JSON")
        this.load.tilemapTiledJSON('floor2', "src/assets/floor 2.JSON")
        this.load.tilemapTiledJSON('floor3', "src/assets/floor 3.JSON")
        this.load.tilemapTiledJSON('floor4', "src/assets/floor 4.JSON")
        this.load.tilemapTiledJSON('floor5', "src/assets/floor 5.JSON")
    }
    create()
    {
        this.add.image(0, 0, "tiles")
        this.scene.start("scene-game")
    }
}