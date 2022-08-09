import { Decoration, EditorView, NodeView } from 'prosemirror-view';

const nodeViews: {
  [name: string]: (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean,
    decorations: Decoration[]
  ) => NodeView;
} = {
};

export default nodeViews;
