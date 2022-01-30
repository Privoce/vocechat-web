// import React from 'react';
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Reset } from "styled-reset";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import store from "./app/store";
import RequireAuth from "./common/component/RequireAuth";

// import Welcome from './routes/Welcome'
import NotFoundPage from "./routes/404";
import LoginPage from "./routes/login";
import HomePage from "./routes/home";
import ChatPage from "./routes/chat";
import ContactsPage from "./routes/contacts";

let persistor = persistStore(store);
ReactDOM.render(
  <>
    <Toaster />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            >
              <Route index element={<ChatPage />} />
              <Route path="chat">
                <Route index element={<ChatPage />} />
                <Route path="channel/:channel_id" element={<ChatPage />} />
                <Route path="dm/:user_id" element={<ChatPage />} />
              </Route>
              <Route path="contacts">
                <Route index element={<ContactsPage />} />
                <Route path=":user_id" element={<ContactsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
    <Reset />
  </>,
  document.getElementById("root")
);
