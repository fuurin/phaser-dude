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
    this.createSky()
    this.createPlatform()
  }

  update(): void {
    return
  }

  private createSky(): Phaser.GameObjects.Image {
    return this.add.image(400, 300, 'sky')
  }

  private createPlatform(): Phaser.Physics.Arcade.StaticGroup {
    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    platforms.create(600, 400, 'platform')
    platforms.create(50, 250, 'platform')
    platforms.create(750, 220, 'platform')

    return platforms
  }
}
