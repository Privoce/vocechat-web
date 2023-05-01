import i18n from "i18next";
import dayjs from "dayjs";
import { initReactI18next } from "react-i18next";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import common from "../public/locales/en/common.json";
import auth from "../public/locales/en/auth.json";
import member from "../public/locales/en/member.json";
import chat from "../public/locales/en/chat.json";
import fav from "../public/locales/en/fav.json";
import widget from "../public/locales/en/widget.json";
import welcome from "../public/locales/en/welcome.json";
import setting from "../public/locales/en/setting.json";
import file from "../public/locales/en/file.json";
import pkg from '../package.json';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

export const defaultNS = "common";
export const resources = {
  en: {
    common,
    chat,
    auth,
    fav,
    member,
    welcome,
    setting,
    file,
    widget
  }
} as const;
i18n.on("languageChanged", (lng) => {
  // 匹配dayjs的多语言关键字
  dayjs.locale(lng === "zh" ? "zh-cn" : lng === "jp" ? "ja" : lng);
});
i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init<HttpBackendOptions>({
    ns: ["common", "chat", "member", "setting", "fav", "file", "welcome", "auth", "widget"],
    defaultNS,
    load: "languageOnly",
    // lng: "jp",
    fallbackLng: "en",
    fallbackNS: "common",
    debug: false,
    detection: {
      order: ["localStorage", "navigator"]
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    returnNull: false,
    // for backend middleware
    backend: {
      queryStringParams: { v: pkg.version },
    }
  });

export default i18n;
