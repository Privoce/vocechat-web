import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import { Reset } from "styled-reset";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./assets/base.css";
import "./common/DayjsSetting";
import "./common/TippySetting";
import { register } from "./serviceWorkerRegistration";
import MarkdownStyleOverride from "./common/component/MarkdownStyleOverride";
import ReduxRoutes from "./routes";
import NewVersion from "./common/component/NewVersion";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <Reset />
    <Toaster />
    <DndProvider backend={HTML5Backend}>
      <ReduxRoutes />
    </DndProvider>
    <MarkdownStyleOverride />
  </>
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
