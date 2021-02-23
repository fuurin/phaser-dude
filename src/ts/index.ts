import 'phaser'
import '../css/index.css'
import Main from './scenes/main'

const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game'
  },
  scene: Main
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
