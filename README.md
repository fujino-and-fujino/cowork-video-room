# cowork-video-room

## What is it ?
サポーターズ主催 [技育キャンプハッカソンVol.10](https://talent.supporterz.jp/geekcamp/2021/)で開発したプログラムです。
ハッカソンでは、努力賞をいただきました！(https://twitter.com/geek_pjt/status/1452201731190788098?s=20)

テーマは「オンラインのチーム開発を促進するアプリケーション」でした。

オンラインでチーム開発をする上で以下のような悩みがあります。
- 先輩に気軽に質問できない
- モチベーションが続かない

また、ZOOMなどを用いてビデオオンしている状態ならばオフラインに近い環境を再現できますが、
- ずっとビデオオンなので気が抜けない
- ストレスが溜まる

のような別の悩みも発生します。  
そこで、画面をぼかしてり、顔だけをキャラクターの顔に差し替えたりし、
「ストレスフリーなビデオチーム開発」
の実現を目指しました。

<img src="https://user-images.githubusercontent.com/82075582/138822254-6e9df46a-e152-4970-bf1d-17283be056ff.png" width="500px">
<img src="https://user-images.githubusercontent.com/82075582/138824271-f43c091d-f66a-4365-ad3d-0ebbdb5a645f.png" width="500px">
 
## DEMO
<img src="https://user-images.githubusercontent.com/82075582/138822279-990085d0-7d3e-43aa-9d23-11b827c667cf.gif" width="500px">
<img src="https://user-images.githubusercontent.com/82075582/138823944-b279c01b-d428-4d2b-a0ca-07c37c417a56.gif" width="500px">
 
## Features

### WebRTC
本プログラムではビデオ通信部分にWebRTCを用いています。
通信はPeer to Peer (P2P)で行いますが、SDPをユーザー同士で交換する必要があるためsocket.ioを用いて通信を最初に行います。
具体的には以下のような処理を行なっています。
1. 1人目のユーザーが入室する
1. 2人目のユーザーが入室する
1. 2人目のユーザーがSDPをサーバーへ送る
1. サーバーはSDPをそのまま1人目のユーザーに送る
1. 1人目のユーザーはSDPを作成しサーバーに送る
1. サーバーはSDPをそのまま2人目のユーザーに送る
1. SDPの交換が無事終了したので、P2P接続が確立する

### OpenCV
カメラで取得した画像の処理には、OpenCVを用いています。
ライブラリはc++で書かれており、
 
## How to install

```bash
git clone git@github.com:fujino-and-fujino/cowork-video-room.git
cd cowork-video-room
docker-compose build
docker-compose up
```

 
## Note
WebRTCとOpenCVの部分のマージがまだできてないです。
 
## Author
@kento980037
@Yutarotaro
 
