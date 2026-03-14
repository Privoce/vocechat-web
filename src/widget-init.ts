// 这个文件必须在所有其他模块之前加载
// 在 Shadow DOM 模式下，动态设置 webpack 的 publicPath 和 widget origin
if (typeof document !== 'undefined') {
  const currentScript = document.currentScript as HTMLScriptElement;
  if (currentScript && currentScript.src) {
    try {
      const scriptUrl = new URL(currentScript.src);
      // 获取脚本所在的目录路径（去掉文件名）
      const scriptPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
      // 设置为脚本所在的完整目录路径
      __webpack_public_path__ = scriptUrl.origin + scriptPath;
      // 保存 origin 供其他模块使用
      (window as any).__VOCECHAT_WIDGET_ORIGIN__ = scriptUrl.origin;
      console.log('[Widget Init] Set origin to:', scriptUrl.origin);
      console.log('[Widget Init] Set publicPath to:', scriptUrl.origin + scriptPath);
    } catch (e) {
      console.warn('[Widget Init] Failed to set webpack public path:', e);
    }
  }
}
