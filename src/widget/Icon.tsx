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
  const { popupTitle, popupSubtitle, popupImage, logo: customLogo, popupClosable } = useWidget();
  const [tooltipVisible, setTooltipVisible] = useState(true);

  // 优先使用自定义 logo，否则使用服务器 logo
  const logo = customLogo || serverLogo;

  if (!logo) return null;

  return (
    <div className="flex items-center gap-3">
      {/* 常驻提示框 - 放在左边 */}
      {tooltipVisible && (
        <div className="relative animate-[fadeIn_0.3s_ease-in-out]">
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
            <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-r border-t border-gray-200 dark:border-gray-700 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Widget 图标按钮 */}
      <button className="rounded-full overflow-hidden w-12 h-12 flex-shrink-0" onClick={handleClick}>
        <img src={logo} alt="logo" className="w-full h-full rounded-full object-cover" />
      </button>
    </div>
  );
};

export default Icon;
