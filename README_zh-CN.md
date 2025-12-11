中文 | [English](./README.md)

# Web Client of VoceChat

<center>
  <img src="./public/android-chrome-192x192.png" width="100" height="100">
</center>
<p>
<center>

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/privoce/vocechat-web/issues)
![GitHub issues](https://img.shields.io/github/issues-raw/Privoce/vocechat-web) ![GitHub](https://img.shields.io/github/license/privoce/vocechat-web) ![GitHub top language](https://img.shields.io/github/languages/top/privoce/vocechat-web) ![Docker Pulls](https://img.shields.io/docker/pulls/privoce/vocechat-server)

</center>

- 🎉 基于 React & Redux Toolkit
- ✅ 使用 Typescript
- 📦 支持 PWA
- 📢 通过 Firebase 实现通知功能

## 部署您自己的服务器！或使用我们的测试服务器

- 部署您自己的 Voce 服务端 ([docker 镜像](https://hub.docker.com/r/privoce/vocechat-server/tags)):
  在 x86_64 平台运行:

```bash
docker run -d --restart=always \
  -p 3000:3000 \
  --name vocechat-server \
  privoce/vocechat-server:latest
```

更多服务器部署说明，请参阅我们的文档：https://doc.voce.chat/

## 预览

- 官方网站: https://voce.chat
- 在线演示: https://privoce.voce.chat/
- 演示 API 文档 (Swagger): https://dev.voce.chat/api/swagger

- 设计稿: https://www.figma.com/file/EHnNr53kNmDWgUT86It6CH/UI
- 文本编辑器: https://plate.udecode.io/docs/installation
- Markdown 编辑器: https://nhn.github.io/tui.editor/latest/
- Redux: [@reduxjs/toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- IndexDB 包装器: https://github.com/localForage/localForage

## 本地开发

- `git clone https://github.com/Privoce/vocechat-web vocechat-web`

- `cd vocechat-web`

- `pnpm install`

- `pnpm start`

- 在浏览器中打开 `localhost:3009`

### 推荐工具

- 推荐使用 [VS Code](https://code.visualstudio.com/) 编辑器
- VS Code 插件:
  - [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): ESLint
  - [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Prettier
  - [dsznajder.es7-react-js-snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets): ES7+ 语法的 React, React-Native 和 Redux 代码片段

## 许可证

[GPL v3](https://github.com/Privoce/vocechat-web/blob/main/LICENSE)

## 感谢所有贡献者

<a href="https://github.com/privoce/vocechat-web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=privoce/vocechat-web" />
</a>

讨论合作: han@privoce.com
  
Telegram group: https://t.me/opencfdchannel VoceChat: https://voce.chat
  
Telegram channel: https://t.me/vocechat_group VoceChat Channel: https://privoce.voce.chat