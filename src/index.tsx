// just for debug performance problem
// import "./wdyr";
import { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./assets/index.css";
import "./common/DayjsSetting";
import "./common/TippySetting";
import { register } from "./serviceWorkerRegistration";
import MarkdownStyleOverride from "./common/component/MarkdownStyleOverride";
import MobileAppTip from "./common/component/MobileAppTip";
import ReduxRoutes from "./routes";
import NewVersion from "./common/component/NewVersion";
// import i18n (needs to be bundled ;)) 
import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// dark mode
const isDarkMode = localStorage.theme === 'dark';
const isLightMode = localStorage.theme === 'light';
if (isDarkMode || (!isLightMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
root.render(
  <Suspense fallback="loading">
    <Toaster toastOptions={{
      className: "dark:!bg-gray-800 dark:!text-gray-50"
    }} />
    <DndProvider backend={HTML5Backend}>
      <ReduxRoutes />
    </DndProvider>
    <MarkdownStyleOverride />
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
        window.location.reload();
      });
    };
    toast((t) => <NewVersion id={t.id} handleUpdate={handleUpdate} />, {
      duration: Infinity,
      position: "top-right"
    });
  }
});
