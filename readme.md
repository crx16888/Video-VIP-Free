网页版：https://vip-video-parser-sepia.vercel.app/

## 本地启动

```bash
cd public
python3 -m http.server 4173
```

启动后访问：http://127.0.0.1:4173/

## iPhone / iPad 安装

本项目是 PWA 网页应用，iOS/iPadOS 可以用 Safari 打开网页版后，通过「分享」->「添加到主屏幕」安装为桌面 App。

Release 中也提供 `VIP视频解析-iOS-iPadOS-WebClip.mobileconfig`。在 iPhone 或 iPad 上下载并安装该描述文件后，会自动添加一个打开网页版的主屏幕图标。

> 注意：真正的 `.ipa` 原生安装包需要 Apple Developer 账号、签名证书和 Xcode 归档流程；当前仓库没有 iOS 原生工程，因此 Release 提供的是免签名的 PWA/WebClip 下载版本。
