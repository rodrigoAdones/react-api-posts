import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import Pages from './pages/containers/Page';

import messages from './messages.json';

addLocaleData([...en, ...es]);

const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en';

ReactDom.render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById('render-target'),
);
