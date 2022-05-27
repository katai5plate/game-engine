# game-engine

脱ツクールを目指して

## TODO

折れないようになるべくハードルを低く

- [ ] レスポンシブなゲーム画面（過去のリポジトリから流用）
- [ ] UI レイヤー（マウス・タッチ操作は基本これ想定でいく）
- [ ] キーボード操作
- [ ] タイルマップレイヤー
  - [ ] 当たり判定
- [ ] オブジェクトレイヤー
- [ ] サウンド再生
- [ ] シーンレイヤー

## いつかやる

- NW.js か Electron に対応
- アツマールコメント API に対応

## 当面の目標

- ボタン UI によるタッチ操作で制限時間以内に星を集めるゲームが作れるまで

## メモ

### 依存関係

- `"pixi.js": "^6.2.0"`
  - `@pixi/tilemap`

## ライセンス

- このゲームエンジン自体は GPL 3.0 です。
  - https://github.com/katai5plate/game-engine/blob/main/LICENSE
- 画像・音声素材には EasyRPG/RTP を使用しています。それは CC BY 4.0 です。
  - https://github.com/EasyRPG/RTP/blob/master/COPYING
