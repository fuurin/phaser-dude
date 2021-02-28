# TypeScriptとWebpackでPhaser Dude Tutorial

学習用ScrapBox
https://scrapbox.io/programming-technology/Phaser.jsでゲームを作る

導入からデプロイまで
``` bash
npmパッケージ取得
$ yarn

開発用サーバ起動
$ yarn dev

webpackビルド
$ yarn build

firebaseにデプロイ (要 npm i -g firebase-tools & firebase login)
$ firebase deploy
```

アセット類は`public/assets`以下に配置します。  
audios, imagesがありますが、他にも必要な場合はwebpack.config.jsの[PhaserAssetsWebpackPlugin](https://www.npmjs.com/package/phaser-assets-webpack-plugin)の設定を修正してください。  
