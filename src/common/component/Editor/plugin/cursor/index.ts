/**
 * @description 自定义光标插件
 * @author zhd
 * */
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import UAParser from 'ua-parser-js';

const uaParser = new UAParser();
const browserName = (uaParser.getBrowser().name || '').toLowerCase();

class Cursor {
  prevFocused: boolean;

  cursor: HTMLDivElement;

  constructor(view: EditorView) {
    this.prevFocused = false;
    this.cursor = document.createElement('div');
    view.dom.parentNode!.appendChild(this.cursor);
    this.update(view, null);
  }

  update(view: EditorView, prevState: EditorState | null) {
    // 判断编辑器是否重新聚焦，页面位置可能已经改变，需要重新计算光标位置
    let refocus = false;
    if (view.hasFocus() && !this.prevFocused) {
      refocus = true;
    }
    this.prevFocused = view.hasFocus();

    const { state } = view;
    const { selection } = state;

    // 选择状态不显示
    if (!selection.empty) {
      this.cursor.style.display = 'none';
      return;
    }
    // fixed: safari 下 代码块不显示
    if (
      browserName.includes('safari')
      && (selection.$from.parent.type.name === 'code_block'
        || selection.$from.parent.type.name === 'math_block')
    ) {
      this.cursor.style.display = 'none';
      return;
    }

    // 文档和选区没有变化时不处理, 除非编辑器重新聚焦，才需要重新计算位置
    if (
      prevState && prevState.doc.eq(state.doc)
      && prevState.selection.eq(state.selection) && !refocus
    ) return;

    this.cursor.style.display = '';
    // fixed: 响应式布局父节点 display: none 导致 offsetParent 为 null 的 bug
    if (!this.cursor.offsetParent) return;
    const box = this.cursor.offsetParent.getBoundingClientRect();
    const { from } = selection;
    const pos = view.coordsAtPos(from);
    // 实现光标闪烁动画重新播放，避免光标移动时刚好动画出于隐藏阶段导致不显示
    this.cursor.className = this.cursor.className.includes('play')
      ? 'editor-cursor editor-cursor-restart' : 'editor-cursor editor-cursor-play';

    this.cursor.style.height = `${pos.bottom - pos.top + 2}px`;
    this.cursor.style.width = '2px';
    this.cursor.style.left = `${pos.left - box.left}px`;
    this.cursor.style.top = `${pos.top - box.top - 1}px`;
  }

  destroy() {
    this.cursor.remove();
  }
}

export const pluginKey = new PluginKey('cursor');

/**
 * focus 逻辑：在聚焦的时候触发 Cursor.update 重新计算光标位置
 * @see https://discuss.prosemirror.net/t/handling-focus-in-plugins/1981/5
 * */
const cursorPlugin = () => new Plugin({
  key: pluginKey,
  state: {
    init() {
      return false;
    },
    apply(transaction, prevFocused) {
      const focused = transaction.getMeta(pluginKey);
      if (typeof focused === 'boolean') {
        return focused;
      }
      return prevFocused;
    },
  },
  props: {
    handleDOMEvents: {
      blur: view => {
        view.dispatch(view.state.tr.setMeta(pluginKey, false));
        return false;
      },
      focus: view => {
        view.dispatch(view.state.tr.setMeta(pluginKey, true));
        return false;
      },
    },
  },
  view(editorView) {
    return new Cursor(editorView);
  },
});

export default cursorPlugin;
