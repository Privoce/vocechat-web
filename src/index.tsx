// just for debug performance problem
// import "./wdyr";
import { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";

import "./assets/index.css";
import "./libs/DayjsSetting";
import "./libs/TippySetting";

import MobileAppTip from "./components/MobileAppTip";
import NewVersion from "./components/NewVersion";
import ReduxRoutes from "./routes";
import { register } from "./serviceWorkerRegistration";
// import i18n (needs to be bundled ;))
import "./i18n";
import "./libs/polyfills";

import { isDarkMode, reloadCurrentPage } from "./utils";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// dark mode
if (isDarkMode()) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
root.render(
  <Suspense fallback="loading">
    <Toaster
      toastOptions={{
        className: "dark:!bg-gray-800 dark:!text-gray-50 wb"
      }}
    />
    <DndProvider backend={HTML5Backend}>
      <ReduxRoutes />
    </DndProvider>
    <MobileAppTip />
  </Suspense>
);

register({
  // onSuccess: () => {
  //   toast.success("Service Worker Installed");
  // },
  onUpdate: (reg) => {
    const handleUpdate = () => {
      reg.unregister().then(() => {
        reloadCurrentPage();
      });
    };
    toast((t) => <NewVersion id={t.id} handleUpdate={handleUpdate} />, {
      duration: Infinity,
      position: "top-right"
    });
  }
});
