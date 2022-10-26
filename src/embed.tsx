import ReactDOM from "react-dom/client";
import Embed from "./embed/index";
import './assets/index.css';
import MarkdownStyleOverride from "./common/component/MarkdownStyleOverride";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <Embed />
    <MarkdownStyleOverride />
  </>
);
