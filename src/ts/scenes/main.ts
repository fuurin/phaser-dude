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
    const platforms = this.createPlatform()
    const player = this.createPlayer()
    this.physics.add.collider(player, platforms)
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

  private createPlayer(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    const player = this.physics.add.sprite(100, 450, 'dude')
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player.body.setGravityY(300)
    this.createPlayerAnimations()
    return player
  }

  private createPlayerAnimations(): Phaser.Animations.AnimationManager {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    return this.anims
  }
}
