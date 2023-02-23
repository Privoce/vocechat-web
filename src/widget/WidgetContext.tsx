import { createContext, useContext, ReactNode } from 'react';
import { getContrastColor } from '../common/utils';

const color = decodeURIComponent(new URLSearchParams(location.search).get("themeColor") || "#1fe1f9");
const from = decodeURIComponent(new URLSearchParams(location.search).get("from") || "widget");
const fgColor = getContrastColor(color);
// 判断是否是iframe上下文
const embed = window.location !== window.parent.location;
const WidgetContext = createContext({ color, fgColor, embed, from });


function WidgetProvider({ children }: { children: ReactNode }) {

    return <WidgetContext.Provider value={{ color, fgColor, embed, from }} >{children}</WidgetContext.Provider>;
}

function useWidget() {
    const context = useContext(WidgetContext);
    if (context === undefined) {
        throw new Error('useWidget must be used within a WidgetProvider');
    }
    return context;
}

export { WidgetProvider, useWidget };