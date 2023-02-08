import { createContext, useContext, ReactNode } from 'react';
import { getContrastColor } from '../common/utils';

const color = decodeURIComponent(new URLSearchParams(location.search).get("themeColor") || "#1fe1f9");
const fgColor = getContrastColor(color);
const ThemeContext = createContext({ color, fgColor });


function ThemeProvider({ children }: { children: ReactNode }) {

    return <ThemeContext.Provider value={{ color, fgColor }} >{children}</ThemeContext.Provider>;
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export { ThemeProvider, useTheme };