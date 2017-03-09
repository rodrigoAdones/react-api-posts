import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import Pages from './pages/containers/Page';

import messages from './messages.json';

import store from './store';

addLocaleData([...en, ...es]);

const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en';

ReactDom.render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('render-target'),
);
