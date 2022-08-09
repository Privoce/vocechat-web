import { InputRule } from 'prosemirror-inputrules';
import { Plugin } from 'prosemirror-state';
import { OpenAutocomplete, Trigger } from './types';
import { inSuggestion } from './utils';

export function createInputRule(plugin: Plugin, type: Trigger) {
  const trigger: RegExp = typeof type.trigger === 'string'
    ? RegExp(`(?:^|\\s|\\n|[^\\d\\w])(${type.trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})$`)
    : type.trigger;

  return new InputRule(trigger, (state, match) => {
    const { decorations } = plugin.getState(state);
    // If we are currently suggesting, don't activate
    if (inSuggestion(state.selection, decorations)) return null;
    // We are taking over the text input here
    const tr = state.tr.insertText(match[1][match[1].length - 1]).scrollIntoView();
    const meta: OpenAutocomplete = { action: 'add', trigger: match[1], type };
    tr.setMeta(plugin, meta);
    return tr;
  });
}
