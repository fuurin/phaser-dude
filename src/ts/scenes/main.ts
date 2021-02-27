import loadAssets from '../assets/loadAssets'

export default class Main extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private stars: Phaser.Physics.Arcade.Group
  private bombs: Phaser.Physics.Arcade.Group
  private scoreText: Phaser.GameObjects.Text
  private score = 0
  private gameOver = false

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
    this.cursors = this.input.keyboard.createCursorKeys()

    this.createSky()
    this.platforms = this.createPlatform()

    this.player = this.createPlayer()
    this.physics.add.collider(this.player, this.platforms)

    this.stars = this.createStars()
    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    )

    this.bombs = this.physics.add.group()
    this.physics.add.collider(this.bombs, this.platforms)
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)

    this.scoreText = this.createScoreText()
  }

  update(): void {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
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

  private createScoreText(): Phaser.GameObjects.Text {
    return this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      color: '#000'
    })
  }

  private createStars(): Phaser.Physics.Arcade.Group {
    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    stars.children.iterate((child: Phaser.Physics.Arcade.Image) =>
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    )

    return stars
  }

  private collectStar(_player, star): void {
    star.disableBody(true, true)
    this.score += 10
    this.scoreText.setText(`score: ${this.score}`)

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child: Phaser.Physics.Arcade.Image) => {
        child.enableBody(true, child.x, 0, true, true)
      })
      this.createBomb()
    }
  }

  private createBomb(): void {
    const bombX =
      this.player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400)

    const bomb = this.bombs.create(bombX, 16, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
  }

  private hitBomb(): void {
    this.physics.pause()
    this.player.setTint(0xff0000)
    this.player.anims.play('turn')
    this.gameOver = true
  }
}
