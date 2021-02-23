import loadAssets from '../assets/loadAssets'

export default class Main extends Phaser.Scene {
  constructor() {
    super({
      key: 'Main',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      }
    })
  }

  preload(): void {
    loadAssets(this)
  }

  create(): void {
    this.add.image(400, 300, 'sky')
  }

  update(): void {
    return
  }
}
