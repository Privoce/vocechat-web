import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
import "dayjs/locale/ja";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";

// import i18n from '../i18n';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
// console.log("dddd", i18n.resolvedLanguage);
// if(i18n.language)
// dayjs.locale(i18n.language == "en" ? "en" : "zh-cn");
