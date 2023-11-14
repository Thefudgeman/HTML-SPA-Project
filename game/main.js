import './style.css'
import Phaser from 'phaser'

const Sizes={
  width:500,
  height:500
}

const speedDown = 300

class GameScene extends Phaser.Scene
{
  constructor()
  {
    super("scene-game")
  }

  preload()
  {
    this.load.image("map", "assets/2D Pixel Dungeon Asset Pack/character and tileset/demonstration.png")
  }

  create()
  {
    this.add.image(0,0, "map").setOrigin(0,0)
  }

  update()
  {}
}

const config = {
  type:Phaser.WEBGL,
  width:Sizes.width,
  height:Sizes.height,
  canvas:gameCanvas,
  scene:[GameScene]
}

const game = new Phaser.Game(config)