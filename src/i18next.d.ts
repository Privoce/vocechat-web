import { resources, defaultNS } from "./i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        allowObjectInHTMLChildren: true,
        returnNull: false;
        defaultNS: typeof defaultNS;
        resources: typeof resources["en"];
    }
}