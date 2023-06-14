import ReactDOM, { Root } from 'react-dom/client';
import { ActionKind, Options, PickerProps } from './types';
import Mention from './custom/picker';
import { containerId } from './container';

const props: PickerProps = {
  view: null,
  loading: false,
  open: false,
  current: 0,
  range: null,
  items: [],
  type: null,
};

let container: null | HTMLDivElement = null;
let root: null | Root = null;

function placePicker() {
  if (container === null) {
    container = document.querySelector(`#${containerId}`) as HTMLDivElement;
  }
  if (root === null) root = ReactDOM.createRoot(container);
  // hide list
  container.style.display = props.open ? 'block' : 'none';

  const rect = document.getElementsByClassName('autocomplete')[0]?.getBoundingClientRect();
  if (!rect) {
    console.error('Autocomplete node not found');
    return;
  }
  container.style.position = 'fixed';
  container.style.top = `${rect.top + rect.height + 8}px`;
  container.style.left = `${rect.left}px`;
  container.style.width = 'fit-content';

  root.render(<Mention
    index={props.current}
    suggestions={props.items}
    onSelect={(i) => {
    }}
  />);
}

function onPick(p: PickerProps) {
  if (!p.type || !p.view || !p.range) {
    console.error('Invalid picker:', p);
    return;
  }
  const nodeName = p.type.name;
  const nodeType = p.view.state.schema.nodes[nodeName];
  if (!nodeType) {
    console.error('Node type not found:', nodeName);
    return;
  }

  const selected = p.items[p.current];
  const node = nodeType.create({ id: selected.id, name: selected.name });
  const tr = p.view.state.tr.replaceWith(p.range.from, p.range.to, node);
  p.view.dispatch(tr);
}

const reducer: Required<Options>['reducer'] = (action) => {
  props.view = action.view;
  props.type = action.type;
  props.range = action.range;

  switch (action.kind) {
    case ActionKind.open: {
      props.current = 0;
      props.open = true;
      placePicker();
      return true;
    }
    case ActionKind.close: {
      props.open = false;
      placePicker();
      return true;
    }
    case ActionKind.up: {
      if (props.items.length === 0) {
        props.current = 0;
      } else {
        props.current -= 1;
        props.current += props.items.length; // negative modulus doesn't work
        props.current %= props.items.length;
        placePicker();
      }
      return true;
    }
    case ActionKind.down: {
      if (props.items.length === 0) {
        props.current = 0;
      } else {
        props.current += 1;
        props.current %= props.items.length;
        placePicker();
      }
      return true;
    }
    case ActionKind.filter: {
      // todo: fetch data
      props.items = [
        { id: '1', name: 'suggestion 1' },
        { id: '2', name: 'suggestion 2' },
        { id: '3', name: 'suggestion 3' },
        { id: '4', name: 'suggestion 4' },
        { id: '5', name: action.filter ?? '' },
        { id: '6', name: '中文输入法' },
      ];
      placePicker();
      return true;
    }
    case ActionKind.enter: {
      onPick(props);
      return true;
    }
    default: {
      console.error('Unimplemented action kind:', action.kind);
      return false;
    }
  }
};

export default reducer;
