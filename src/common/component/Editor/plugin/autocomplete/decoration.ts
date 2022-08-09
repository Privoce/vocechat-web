import { undoInputRule } from 'prosemirror-inputrules';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { closeAutocomplete } from './actions';
import {
  ActiveAutocompleteState,
  AutocompleteTrMeta,
  FromTo,
  KEEP_OPEN,
  Options,
  AutocompleteAction,
  ActionKind,
  AutocompleteState,
} from './types';
import { inSuggestion, pluginKey } from './utils';

const inactiveAutocompleteState: AutocompleteState = {
  active: false,
  decorations: DecorationSet.empty,
};

function actionFromEvent(event: KeyboardEvent): ActionKind | null {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      return event.key as ActionKind;
    case 'Tab':
    case 'Enter':
      return ActionKind.enter;
    case 'Escape':
      return ActionKind.close;
    default:
      return null;
  }
}

function cancelIfInsideAndPass(view: EditorView) {
  const plugin = pluginKey.get(view.state) as Plugin;
  const { decorations } = plugin.getState(view.state);
  if (inSuggestion(view.state.selection, decorations)) {
    closeAutocomplete(view);
  }
  return false;
}

export function getDecorationPlugin(reducer: Required<Options>['reducer']) {
  const plugin: Plugin<AutocompleteState> = new Plugin({
    key: pluginKey,
    view() {
      return {
        update: (view, prevState) => {
          const prev = plugin.getState(prevState) as ActiveAutocompleteState;
          const next = plugin.getState(view.state) as ActiveAutocompleteState;

          const started = !prev.active && next.active;
          const stopped = prev.active && !next.active;
          const changed = next.active && !started && !stopped && prev.filter !== next.filter;

          const action: Omit<AutocompleteAction, 'kind'> = {
            view,
            trigger: next.trigger ?? (prev.trigger as string),
            filter: next.filter ?? prev.filter,
            range: next.range ?? (prev.range as FromTo),
            type: next.type ?? prev.type,
          };
          if (started) reducer({ ...action, kind: ActionKind.open });
          if (changed) reducer({ ...action, kind: ActionKind.filter });
          if (stopped) reducer({ ...action, kind: ActionKind.close });
        },
      };
    },
    state: {
      init: () => inactiveAutocompleteState,
      apply(tr, state): AutocompleteState {
        const meta = tr.getMeta(plugin) as AutocompleteTrMeta;
        if (meta?.action === 'add') {
          const { trigger, filter, type } = meta;
          const from = tr.selection.from - trigger.length - (filter?.length ?? 0);
          const to = tr.selection.from;
          const className = type?.decorationAttrs?.class
            ? ['autocomplete', type?.decorationAttrs?.class].join(' ')
            : 'autocomplete';
          const attrs = { ...type?.decorationAttrs, class: className };
          const deco = Decoration.inline(from, to, attrs, {
            inclusiveStart: false,
            inclusiveEnd: true,
          });
          return {
            active: true,
            trigger: meta.trigger,
            decorations: DecorationSet.create(tr.doc, [deco]),
            filter: filter ?? '',
            range: { from, to },
            type,
          };
        }
        const { decorations } = state as AutocompleteState;
        const nextDecorations = decorations.map(tr.mapping, tr.doc);
        const hasDecoration = nextDecorations.find().length > 0;
        // If no decoration, explicitly remove, or click somewhere else in the editor
        if (
          meta?.action === 'remove' ||
          !inSuggestion(tr.selection, nextDecorations) ||
          !hasDecoration
        )
          return inactiveAutocompleteState;

        const { active, trigger, type } = state as ActiveAutocompleteState;
        // Ensure that the trigger is in the decoration
        const { from, to } = nextDecorations.find()[0];
        const text = tr.doc.textBetween(from, to);
        if (!text.startsWith(trigger)) return inactiveAutocompleteState;

        return {
          active,
          trigger,
          decorations: nextDecorations,
          filter: text.slice(trigger.length),
          range: { from, to },
          type,
        };
      },
    },
    props: {
      decorations: (state) => plugin.getState(state)?.decorations,
      handlePaste: (view) => cancelIfInsideAndPass(view),
      handleDrop: (view) => cancelIfInsideAndPass(view),
      handleKeyDown(view, event) {
        const { trigger, active, decorations, type } = plugin.getState(
          view.state,
        ) as ActiveAutocompleteState;

        if (!active || !inSuggestion(view.state.selection, decorations)) return false;

        const { from, to } = decorations.find()[0];
        const text = view.state.doc.textBetween(from, to);

        // Be defensive, just in case the trigger doesn't exist
        const filter = text.slice(trigger?.length ?? 1);

        const checkCancelOnSpace = type?.cancelOnFirstSpace ?? true;
        if (
          checkCancelOnSpace &&
          filter.length === 0 &&
          (event.key === ' ' || event.key === 'Spacebar')
        ) {
          closeAutocomplete(view);
          // Take over the space creation so no other input rules are fired
          view.dispatch(view.state.tr.insertText(' ').scrollIntoView());
          return true;
        }
        if (filter.length === 0 && event.key === 'Backspace') {
          undoInputRule(view.state, view.dispatch);
          closeAutocomplete(view);
          return true;
        }

        const kind = actionFromEvent(event);
        const action: Omit<AutocompleteAction, 'kind'> = {
          view,
          trigger,
          filter,
          range: { from, to },
          type,
        };
        switch (kind) {
          case ActionKind.close:
            // The user action will be handled in the view code above
            // Allows clicking off to be handled in the same way
            return closeAutocomplete(view);
          case ActionKind.enter: {
            // Only trigger the cancel if it is not expliticly handled in the select
            const result = reducer({ ...action, kind: ActionKind.enter });
            if (result === KEEP_OPEN) return true;
            return result || closeAutocomplete(view);
          }
          case ActionKind.up:
          case ActionKind.down:
            return Boolean(reducer({ ...action, kind }));
          case ActionKind.left:
          case ActionKind.right:
            if (!type?.allArrowKeys) return false;
            return Boolean(reducer({ ...action, kind }));
          default:
            break;
        }
        return false;
      },
    },
  });
  return plugin;
}
