// Run with: node --test scripts/password-sessions.test.cjs
// Exercise the real streaming hook and password dialog with controlled I/O.
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { createRequire } = require("node:module");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");
const strings = require("../public/locales/en/auth.json");
const translate = (key) => key.split(".").reduce((value, part) => value[part], strings);

function load(file, mocks, globals = {}) {
  const filename = path.resolve(__dirname, "..", file);
  const sourceRequire = createRequire(filename);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (name) => mocks[name] ?? sourceRequire(name),
    console: { log() {}, info() {}, error() {} },
    ...globals
  }, { filename });
  return module.exports.default;
}

function streaming({ rejectRenewal = false } = {}) {
  const auth = { token: "access", refreshToken: "refresh", expireTime: Date.now() + 3600000 };
  const actions = [], messages = [], connections = [], renewals = [], timers = new Map();
  let nextTimer = 1;
  const state = { authData: { user: { uid: 7 }, guest: false },
    footprint: { readUsers: [], readChannels: [] } };
  class EventSource {
    static OPEN = 1;
    static CONNECTING = 0;
    constructor(url) { this.url = url; this.readyState = 1; connections.push(this); }
    close() { this.closed = true; this.readyState = 2; }
  }
  const dispatch = (action) => {
    actions.push(action);
    if (action.type === "resetAuthData") {
      auth.token = "";
      auth.refreshToken = "";
    }
  };
  const slice = new Proxy({}, { get: (_, name) => (payload) => ({ type: name, payload }) });
  const mocks = {
    react: { useCallback: (fn) => fn, useEffect() {}, useRef: (current) => ({ current }) },
    "react-hot-toast": { default: (message) => messages.push(message) },
    dayjs: { default: require("dayjs") },
    "react-redux": { shallowEqual: () => true },
    "@/i18n": { default: { t: translate } },
    "@/app/config": { default: "https://chat.example.com/api" },
    "@/app/services/auth": { useRenewMutation: () => [async (input) => {
      renewals.push(input);
      if (rejectRenewal) {
        auth.token = "";
        auth.refreshToken = "";
        return { error: { status: 401 } };
      }
      return { data: {} };
    }] },
    "@/app/services/server": { serverApi: {} },
    "@/app/store": { useAppDispatch: () => dispatch, useAppSelector: (select) => select(state) },
    "@/utils": { getLocalAuthData: () => ({ ...auth }), isElectronContext: () => false },
    "./chat.handler": { default() {} }
  };
  for (const name of ["auth.data", "channels", "footprint", "message", "message.channel",
    "message.file", "message.reaction", "message.user", "server", "ui", "users", "voice"]) {
    mocks[`@/app/slices/${name}`] = slice;
  }
  const hook = load("src/hooks/useStreaming/index.ts", mocks, {
    EventSource, URLSearchParams,
    window: {}, document: { hidden: false }, navigator: { onLine: true },
    setTimeout: (fn) => { const id = nextTimer++; timers.set(id, fn); return id; },
    clearTimeout: (id) => timers.delete(id)
  });
  return { ...hook(), auth, actions, messages, connections, renewals, timers };
}

for (const reason of ["password_changed", "login_from_other_device", "delete_user",
  "delete_device", "frozen", "logout", "future_server_reason"]) {
  test(`kick ${reason} clears auth, closes the stream and cancels heartbeat reconnects`, async () => {
    const fixture = streaming();
    await fixture.startStreaming();
    const connection = fixture.connections[0];
    connection.onmessage({ data: JSON.stringify({ type: "heartbeat" }) });
    assert.equal(fixture.timers.size, 1);
    connection.onmessage({ data: JSON.stringify({ type: "kick", reason }) });
    assert.equal(connection.closed, true);
    assert.equal(fixture.auth.token, "");
    assert.equal(fixture.auth.refreshToken, "");
    assert.equal(fixture.timers.size, 0);
    assert.equal(fixture.actions.filter((a) => a.type === "resetAuthData").length, 1);
    assert.equal(fixture.renewals.length, 0);
    if (reason === "password_changed") {
      assert.equal(fixture.messages[0], strings.logout.password_changed);
    }
    await fixture.startStreaming();
    assert.equal(fixture.connections.length, 1);
  });
}

test("offline device with rejected renewal stops reconnecting before access-token expiry", async () => {
  const fixture = streaming({ rejectRenewal: true });
  await fixture.startStreaming();
  const connection = fixture.connections[0];
  await connection.onerror({ target: connection });
  assert.equal(fixture.renewals.length, 1);
  assert.equal(connection.closed, true);
  assert.equal(fixture.auth.token, "");
  assert.equal(fixture.timers.size, 0);
});

test("recoverable stream error renews credentials and schedules reconnect", async () => {
  const fixture = streaming();
  await fixture.startStreaming();
  const connection = fixture.connections[0];
  await connection.onerror({ target: connection });
  assert.equal(fixture.renewals.length, 1);
  assert.equal(fixture.auth.token, "access");
  assert.equal(fixture.timers.size, 1);
});

function passwordDialog() {
  const values = [], requests = [], messages = [];
  let cursor = 0, closed = 0, tree, resolve, reject;
  const pending = new Promise((ok, fail) => { resolve = ok; reject = fail; });
  const component = load("src/components/ManageMembers/UpdatePassword.tsx", {
    react: { ...React, useState: (initial) => {
      const index = cursor++;
      if (!(index in values)) values[index] = initial;
      return [values[index], (value) => { values[index] = value; }];
    } },
    "react-hot-toast": { default: { error: (message) => messages.push(message) } },
    "react-i18next": { useTranslation: () => ({ t: translate }) },
    "@/hooks/useUserOperation": { default: () => ({ updatePassword: (value) => {
      requests.push(value);
      return pending;
    } }) },
    "../Modal": { default: "div" },
    "../styled/Input": { default: "input" },
    "../styled/Button": { default: "button" }
  });
  function nodes(node = tree) {
    if (!node || typeof node !== "object") return [];
    return [node, ...React.Children.toArray(node.props?.children).flatMap(nodes)];
  }
  const render = () => {
    cursor = 0;
    tree = component({ uid: 7, onClose: () => closed++ });
    return renderToStaticMarkup(tree);
  };
  render();
  return { render, requests, messages, resolve, reject,
    get input() { return nodes().find((node) => node.type === "input").props; },
    get save() { return nodes().find((node) => node.type === "button").props; },
    get closed() { return closed; } };
}

test("password dialog explains sign-out and waits for a successful reset", async () => {
  const panel = passwordDialog();
  assert.match(panel.render(), /sign this member out on all devices/);
  assert.equal(panel.input.type, "password");
  panel.input.onChange({ target: { value: "new-password" } });
  panel.render();
  const saved = panel.save.onClick();
  panel.render();
  assert.equal(panel.save.disabled, true);
  assert.equal(panel.closed, 0);
  panel.resolve();
  await saved;
  panel.render();
  assert.deepEqual(panel.requests, ["new-password"]);
  assert.equal(panel.closed, 1);
  assert.equal(panel.input.value, "");
});

test("failed password reset keeps the input for retry", async () => {
  const panel = passwordDialog();
  panel.input.onChange({ target: { value: "new-password" } });
  panel.render();
  const saved = panel.save.onClick();
  panel.reject(new Error("server failed"));
  await saved;
  panel.render();
  assert.equal(panel.closed, 0);
  assert.equal(panel.input.value, "new-password");
  assert.equal(panel.save.disabled, false);
});

test("short passwords never submit a reset request", async () => {
  const panel = passwordDialog();
  panel.input.onChange({ target: { value: "short" } });
  panel.render();
  await panel.save.onClick();
  assert.equal(panel.requests.length, 0);
  assert.equal(panel.closed, 0);
  assert.deepEqual(panel.messages, ["Min length is 6"]);
});
