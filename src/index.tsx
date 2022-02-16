import React from 'react';
import ReactDom from 'react-dom';
import { loadServer, DevTools } from 'jira-dev-tool';

import 'antd/dist/antd.less';

import { AppProviders } from './context';
import App from './app';

if (module && module.hot) {
  module.hot.accept();
}

loadServer(() => {
  ReactDom.render(
    <AppProviders>
      <App />
      <DevTools />
    </AppProviders>,
    document.querySelector('#root'),
  );
});
