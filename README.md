# Static Boiler Plate
シンプルな静的サイトを作る際のテンプレート

## 環境構築
node version - 14.15.1

1.node_modulesのインストール  
`yarn install`

2.gulp watchの起動 ( Live reloadの開始 )  
`yarn run gulp`  
※ ローカルサーバーが立ち上がり、各ファイルのwatchとコンパイルが始まります。

### ディレクトリ構造
```
dist - 公開用のディレクトリ
src - 開発用のディレクトリ
├ assets
│ ├ js
│ │ ├ main.js
│ │ └ vendor.js
│ ├ css
│ │ └ style.css
│ └ img
│ 　 └ logo.png
└ ejs
　 └ index.html
.browserslistrc - autoprefixの対応ブラウザ
gulpfile.js - gulpタスクの設定タスク
```

## gulpタスク一覧
・配布用ファイルのビルド  
`yarn run gulp clean`

・distに吐き出したファイルの削除  
`yarn run gulp clean`

・EJSのコンパイル  
`yarn run gulp ejs`

・sassのコンパイル  
`yarn run gulp sass`

・EJSのコンパイル  
`yarn run gulp ejs`

・画像の圧縮  
`yarn run gulp imagemin`

## タスクランナー
gulp - https://gulpjs.com/

### マークアップ・共通テンプレート
EJS - https://ejs.co/#docs

### スタイルシート
SCSS - https://sass-lang.com/documentation
