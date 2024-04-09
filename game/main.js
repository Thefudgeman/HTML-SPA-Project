import './style.css'
import Phaser from 'phaser'
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"
import Preloader from './src/scenes/preloader.js'
import shopScene from './src/scenes/ShopScene.js'
import GameScene, { GameSceneFloor2 } from './src/scenes/Maingame.js'
import battleScene from './src/scenes/BattleScene.js'






const Sizes = {
    width: 960,
    height: 640
}

const config = {
    type: Phaser.WEBGL,
    width: Sizes.width,
    height: Sizes.height,
    canvas: gameCanvas,
    physics:
    {
        default:"arcade",
        arcade:
        {
            debug:true
        }
    },

    scene: [Preloader, GameScene, GameSceneFloor2, battleScene, shopScene]
}
const game = new Phaser.Game(config)