import assets from './assets.json'
export default (scene: Phaser.Scene): void =>
  Object.keys(assets).forEach((method) =>
    assets[method].forEach((args) => scene.load[method](...args))
  )
