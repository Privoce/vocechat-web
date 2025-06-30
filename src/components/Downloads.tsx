const Downloads = () => {
  return (
    <div>
      <div className="flex items-center gap-2 py-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.privoce.vocechatclient"
          target="_blank"
        >
          <img src="https://doc.voce.chat/img/icon.app.google.play.png" className="h-8" />
        </a>
        <a href="https://s.voce.chat/vocechat.android.apk" target="_blank">
          <img src="https://doc.voce.chat/img/icon.app.apk.png" className="h-8" />
        </a>
        <a href="https://apps.apple.com/app/vocechat/id1631779678" target="_blank">
          <img src="https://doc.voce.chat/img/icon.app.ios.png" className="h-8" />
        </a>
        <a href="https://github.com/Privoce/vocechat-desktop/releases/latest" target="_blank">
          <img src="https://doc.voce.chat/img/icon.app.desktop.png" className="h-8" />
        </a>
      </div>
    </div>
  );
};

export default Downloads;
