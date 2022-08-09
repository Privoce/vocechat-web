import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { AutocompleteTrMeta } from './types';
import { pluginKey } from './utils';

export function openAutocomplete(view: EditorView, trigger: string, filter?: string) {
  // TODO: Can activate a type?
  const plugin = pluginKey.get(view.state) as Plugin;
  const meta: AutocompleteTrMeta = { action: 'add', trigger, filter, type: null };
  const tr = view.state.tr
    .insertText(`${trigger}${filter ?? ''}`)
    .scrollIntoView()
    .setMeta(plugin, meta);
  view.dispatch(tr);
}

export function closeAutocomplete(view: EditorView) {
  const plugin = pluginKey.get(view.state) as Plugin;
  const meta: AutocompleteTrMeta = { action: 'remove' };
  const tr = view.state.tr.setMeta(plugin, meta);
  view.dispatch(tr);
  return true;
}
