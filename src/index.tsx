import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import { loadServer, DevTools } from "jira-dev-tool";

import "antd/dist/antd.less";

import { AppProviders } from "./context";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadServer(() => {
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
        <DevTools />
      </AppProviders>
    </React.StrictMode>
  );
});
