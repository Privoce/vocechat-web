import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import IconQuestion from "../../../../assets/icons/question.svg";
import {
  BalloonToolbar,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  usePlateEditorRef,
} from "@udecode/plate";

const MarkBallonToolbar = () => {
  const editor = usePlateEditorRef();

  const arrow = false;
  const theme = "dark";
  const tooltip = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: "top",
  };

  return (
    <BalloonToolbar
      popperOptions={{
        placement: "top",
      }}
      theme={theme}
      arrow={arrow}
    >
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<IconQuestion />}
        tooltip={{ content: "Bold (⌘B)", ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<IconQuestion />}
        tooltip={{ content: "Italic (⌘I)", ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<IconQuestion />}
        tooltip={{ content: "Underline (⌘U)", ...tooltip }}
      />
    </BalloonToolbar>
  );
};
export default MarkBallonToolbar;
