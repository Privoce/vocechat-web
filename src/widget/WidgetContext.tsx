import { createContext, useContext, ReactNode } from 'react';
import { useGetLoginConfigQuery, useGetServerQuery } from '../app/services/server';
import { useAppSelector } from '../app/store';
import { getContrastColor } from '../common/utils';

const query = new URLSearchParams(location.search);
const color = decodeURIComponent(query.get("themeColor") || "#1fe1f9");
const from = decodeURIComponent(query.get("from") || "widget.link");
const fgColor = getContrastColor(color);
// 判断是否是iframe上下文
const embed = window.location !== window.parent.location;
const WidgetContext = createContext({ color, fgColor, embed, from, loading: true, inviteOnly: false, name: "", logo: "" });


function WidgetProvider({ children }: { children: ReactNode }) {
    const { isLoading: loadingServerData } = useGetServerQuery();
    const { isLoading: loadingConfig, data: loginConfig } = useGetLoginConfigQuery();
    const serverData = useAppSelector(store => store.server);

    const loading = loadingConfig || loadingServerData;
    // if(loading) return 
    return <WidgetContext.Provider value={{ loading, color, fgColor, embed, from, inviteOnly: loginConfig?.who_can_sign_up == "InvitationOnly", name: serverData?.name, logo: serverData.logo }} >{children}</WidgetContext.Provider>;
}

function useWidget() {
    const context = useContext(WidgetContext);
    if (context === undefined) {
        throw new Error('useWidget must be used within a WidgetProvider');
    }
    return context;
}

export { WidgetProvider, useWidget };