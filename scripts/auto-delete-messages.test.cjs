// Run with: node scripts/auto-delete-messages.test.cjs
// Exercise the actual component's rendered controls and API requests without a DOM.
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { createRequire } = require("node:module");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");

const sourceFile = path.resolve(__dirname, "../src/components/AutoDeleteMessages.tsx");
const sourceRequire = createRequire(sourceFile);
const source = ts.transpileModule(readFileSync(sourceFile, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const strings = require("../public/locales/en/setting.json").auto_delete_msg;

function setup({ admin = true, owner = 2, uid = 1, channelSupport = true,
  personalSupport = true, type = "channel", fail = false } = {}) {
  const group = { gid: 42, owner, ...(channelSupport ? { auto_delete_after: 300 } : {}) };
  const state = {
    authData: { user: { uid, is_admin: admin } },
    channels: { byId: { 42: group } },
    footprint: {
      autoDeleteSupported: { groups: personalSupport, users: personalSupport },
      autoDeleteMsgChannels: [{ gid: 42, expires_in: 600 }],
      autoDeleteMsgUsers: [{ uid: 42, expires_in: 600 }]
    }
  };
  const values = [], requests = [], messages = [];
  let cursor = 0, radio, save, tree;
  const mutation = (scope) => (body) => ({ unwrap: async () => {
    requests.push({ scope, body: JSON.parse(JSON.stringify(body)) });
    if (fail) throw new Error("save failed");
  } });
  const mocks = {
    react: { ...React,
      useState(initial) {
        const index = cursor++;
        if (!(index in values)) values[index] = initial;
        return [values[index], (value) => { values[index] = value; }];
      },
      useEffect() {}
    },
    "react-hot-toast": { toast: { success: (value) => messages.push(value), error: (value) => messages.push(value) } },
    "react-i18next": { useTranslation: (_, options) => ({ t: (key) => options ? strings[key] : key }) },
    "@/app/services/user": { useUpdateAutoDeleteMsgMutation: () => [mutation("personal"), {}] },
    "../app/services/channel": {
      useGetChannelQuery: () => ({ currentData: group, isFetching: false }),
      useUpdateChannelMutation: () => [mutation("channel"), {}],
      useLazyClearChannelMessageQuery: () => [() => {}, {}]
    },
    "../app/store": { useAppSelector: (selector) => selector(state) },
    "./SaveTip": { default: (props) => { save = props; return React.createElement("button", null, "Save"); } },
    "./styled/Button": { default: ({ children }) => React.createElement("button", null, children) },
    "./styled/Radio": { default: (props) => {
      radio = props;
      return React.createElement("div", null, props.options.map((label, index) =>
        React.createElement("label", { key: label }, label,
          React.createElement("input", { type: "radio", disabled: props.disabled,
            checked: props.value === props.values[index], readOnly: true }))));
    } },
    "react-redux": { shallowEqual: () => true }
  };
  const module = { exports: {} };
  vm.runInNewContext(source, { module, exports: module.exports,
    require: (id) => mocks[id] ?? sourceRequire(id), confirm: () => false
  }, { filename: sourceFile });
  const render = () => {
    cursor = 0;
    save = undefined;
    tree = module.exports.default({ id: 42, type });
    return renderToStaticMarkup(tree);
  };
  const findSwitch = (node = tree) => {
    if (!node || typeof node !== "object") return undefined;
    if (node.props?.role === "switch") return node.props;
    for (const child of React.Children.toArray(node.props?.children)) {
      const result = findSwitch(child);
      if (result) return result;
    }
  };
  render();
  return { render, requests, messages, get radio() { return radio; }, get save() { return save; },
    get toggle() { return findSwitch(); } };
}

test("administrator defaults to channel and keeps separate personal drafts", async () => {
  const panel = setup();
  assert.equal(panel.toggle["aria-checked"], true);
  assert.equal(panel.radio.value, 300);
  panel.radio.onChange(2592000);
  panel.render();
  await panel.save.saveHandler();
  assert.deepEqual(panel.requests, [{ scope: "channel", body: { id: 42, auto_delete_after: 2592000 } }]);
  panel.toggle.onClick();
  panel.render();
  assert.equal(panel.radio.value, 600);
  panel.radio.onChange(3600);
  panel.render();
  await panel.save.saveHandler();
  assert.deepEqual(panel.requests[1], { scope: "personal", body: { groups: [{ gid: 42, expires_in: 3600 }] } });
  panel.toggle.onClick();
  panel.render();
  assert.equal(panel.radio.value, 2592000);
});

test("old servers disable the channel switch while allowing one month personally", async () => {
  const panel = setup({ channelSupport: false });
  assert.equal(panel.toggle.disabled, true);
  assert.match(panel.render(), /The server does not support this option/);
  assert.equal(panel.radio.disabled, false);
  assert.ok(panel.radio.values.includes(2592000));
  panel.radio.onChange(2592000);
  panel.render();
  await panel.save.saveHandler();
  assert.deepEqual(panel.requests, [{ scope: "personal", body: { groups: [{ gid: 42, expires_in: 2592000 }] } }]);
});

test("servers without personal auto-delete disable the month option", () => {
  const panel = setup({ channelSupport: false, personalSupport: false });
  assert.equal(panel.radio.disabled, true);
  assert.equal(panel.save, undefined);
  assert.match(panel.render(), /The server does not support this option/);
});

test("members only see personal settings and owners default to the channel", () => {
  const member = setup({ admin: false });
  assert.equal(member.toggle, undefined);
  assert.equal(member.radio.value, 600);
  const owner = setup({ admin: false, owner: 1 });
  assert.equal(owner.toggle["aria-checked"], true);
});

test("DM one month uses the existing personal endpoint", async () => {
  const panel = setup({ type: "dm" });
  assert.equal(panel.toggle, undefined);
  panel.radio.onChange(2592000);
  panel.render();
  await panel.save.saveHandler();
  assert.deepEqual(panel.requests, [{ scope: "personal", body: { users: [{ uid: 42, expires_in: 2592000 }] } }]);
});

test("failed saves display an error and keep the draft available", async () => {
  const panel = setup({ fail: true });
  panel.radio.onChange(2592000);
  panel.render();
  await panel.save.saveHandler();
  assert.deepEqual(panel.messages, ["Failed to save"]);
  assert.equal(panel.radio.value, 2592000);
});
