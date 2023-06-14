import { Plugin } from 'prosemirror-state';
import { inputRules } from 'prosemirror-inputrules';
import { Options, ActionKind, AutocompleteAction } from './types';
import { getDecorationPlugin } from './decoration';
import { createInputRule } from './input-rules';

export function defaultReducer(options: Partial<Options>) {
  return (action: AutocompleteAction): boolean => {
    switch (action.kind) {
      case ActionKind.open:
        return options.onOpen?.(action) ?? false;
      case ActionKind.close:
        return options.onClose?.(action) ?? false;
      case ActionKind.up:
      case ActionKind.down:
      case ActionKind.left:
      case ActionKind.right:
        return options.onArrow?.(action) ?? false;
      case ActionKind.filter:
        return options.onFilter?.(action) ?? false;
      case ActionKind.enter:
        return options.onEnter?.(action) ?? false;
      default:
        return false;
    }
  };
}

export function autocomplete(opts: Partial<Options> = {}) {
  const options: Options = {
    triggers: [],
    reducer: defaultReducer(opts),
    ...opts,
  };
  const { reducer, triggers } = options;

  const plugin = getDecorationPlugin(reducer);

  const rules: Plugin[] = [
    plugin,
    inputRules({
      // Create an input rule for each trigger
      rules: triggers.map((type) => createInputRule(plugin, type)),
    }),
  ];
  return rules;
}
