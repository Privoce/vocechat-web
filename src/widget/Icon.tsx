// import React from "react";
import { useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../app/store";
import { useWidget } from "./WidgetContext";

type Props = {
  handleClick: () => void;
};

const Icon = ({ handleClick }: Props) => {
  const serverLogo = useAppSelector((store) => store.server.logo, shallowEqual);
  const { popupTitle, popupSubtitle, popupImage, logo: customLogo, popupClosable, showPopup, embed, isMobile: isMobileFromContext } = useWidget();
  const [tooltipVisible, setTooltipVisible] = useState(true);

  // 优先使用自定义 logo，否则使用服务器 logo
  const logo = customLogo || serverLogo;

  // 检测是否是移动端
  // 在 embed 模式（iframe/shadow DOM）下，使用从父窗口传递的 isMobile 参数
  // 在非 embed 模式下，直接检测当前窗口宽度
  const isMobile = embed ? isMobileFromContext : (typeof window !== 'undefined' && window.innerWidth < 768);

  // 是否显示 tooltip（桌面端 + 有内容 + 用户未关闭 + showPopup 开关打开）
  const showTooltip = !isMobile && tooltipVisible && (popupTitle || popupSubtitle) && showPopup;

  if (!logo) return null;

  return (
    <div className="relative" style={{ width: '48px', height: '48px' }}>
      {/* 常驻提示框 - 绝对定位在左边，移动端不显示 */}
      {showTooltip && (
        <div className="absolute right-[60px] bottom-0 animate-[fadeIn_0.3s_ease-in-out]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 min-w-[220px] max-w-[300px] border border-gray-200 dark:border-gray-700">
            {/* 关闭按钮 */}
            {popupClosable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipVisible(false);
                }}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L11 11M1 11L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
            <div className="flex items-start gap-3">
              {popupImage && (
                <img
                  src={popupImage}
                  alt="icon"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {popupTitle}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {popupSubtitle}
                </div>
              </div>
            </div>
            {/* 小三角指向右边 */}
            <div className="absolute bottom-3 -right-[6px] w-3 h-3 bg-white dark:bg-gray-800 border-r border-t border-gray-200 dark:border-gray-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Widget 图标按钮 - 固定位置 */}
      <button className="rounded-full overflow-hidden w-12 h-12" onClick={handleClick}>
        <img src={logo} alt="logo" className="w-full h-full rounded-full object-cover" />
      </button>
    </div>
  );
};

export default Icon;
