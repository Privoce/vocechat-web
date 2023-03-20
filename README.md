# Web Client of VoceChat

<center>
  <img src="./public/android-chrome-192x192.png" width="100" height="100">
</center>
<p>
<center>

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/privoce/vocechat-web/issues)
![GitHub issues](https://img.shields.io/github/issues-raw/Privoce/vocechat-web) ![GitHub](https://img.shields.io/github/license/privoce/vocechat-web) ![GitHub top language](https://img.shields.io/github/languages/top/privoce/vocechat-web) ![Docker Pulls](https://img.shields.io/docker/pulls/privoce/vocechat-server)

</center>

- 🎉 Powered by React & Redux Toolkit
- ✅ Typescript
- 📦 PWA
- 📢 Notification

## Host your server! Or use our test server

- Host your own Voce server ([docker image](https://hub.docker.com/r/privoce/vocechat-server/tags)):
  Run on x86_64 platform:

```bash
docker run -d --restart=always \
  -p 3000:3000 \
  --name vocechat-server \
  privoce/vocechat-server:latest
```

For more server hosting instructions, see our documentation: https://doc.voce.chat/

## Preview

- official site: https://voce.chat
- live demo: https://privoce.voce.chat/
- demo API Docs (Swagger): https://dev.voce.chat/api/swagger

- design: https://www.figma.com/file/EHnNr53kNmDWgUT86It6CH/UI
- text editor: https://plate.udecode.io/docs/installation
- markdown editor: https://nhn.github.io/tui.editor/latest/
- redux: [@reduxjs/toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- indexDB wrapper: https://github.com/localForage/localForage

## Local Development

- `git clone https://github.com/Privoce/vocechat-web vocechat-web`

- `cd vocechat-web & yarn install`

- `yarn start`

- Open `localhost:3009`

### Tools Recommended

- [VS Code](https://code.visualstudio.com/) Editor Recommended
- VS Code plugins:
  - [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): ESLint
  - [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Prettier
  - [dsznajder.es7-react-js-snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets): Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax

## License

[GPL v3](https://github.com/Privoce/vocechat-web/blob/main/LICENSE)

## Thanks all the contributors

<a href="https://github.com/privoce/vocechat-web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=privoce/vocechat-web" />
</a>

Discuss collaboration: han@privoce.com or https://bridger.chat/han
  
Telegram group: https://t.me/opencfdchannel VoceChat: https://voce.chat
  
Telegram channel: https://t.me/vocechat_group VoceChat Channel: https://privoce.voce.chat
