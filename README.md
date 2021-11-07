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

今回は、javascriptで動く[opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs)を用いており、node.jsのサーバー側で動作します。

![opencv](https://user-images.githubusercontent.com/53333096/140637779-e393e468-e75b-4f22-b590-5beb0fabfa79.png)

opencv4nodejsはインストール後、ビルドが必要なため、express側のDockerfileにその処理を記述しています。

#### 画像処理
本プログラムでは、カメラ画像に対し、3つの処理を実装しました。

1. グレースケール
画像を白黒にすることができます。
![gray](https://user-images.githubusercontent.com/53333096/140637791-60e7c2fb-da68-4703-8fda-b5bd69b5a5dd.gif)


2. 顔認識
カメラ画像のうち、顔部分のみを検出することで、3.のようにぼかしたり、好きなキャラ画像を合成したりすることが可能です。
![face](https://user-images.githubusercontent.com/53333096/140637753-80d902b9-722b-47a1-8791-6350c6bcb225.gif)

3. ぼかし
見せたくない部分などをぼかすことで、ビデオオンの精神的負担を軽減できます。
![blur](https://user-images.githubusercontent.com/53333096/140637757-e5fae9f3-375f-49ab-aaaa-7636566616c4.gif)


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
 
