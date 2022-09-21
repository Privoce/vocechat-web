import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import Embed from "./embed/index";
import "./assets/base.css";
import MarkdownStyleOverride from "./common/component/MarkdownStyleOverride";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <Reset />
    <Embed />
    <MarkdownStyleOverride />
  </>
);
