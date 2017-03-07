import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import messages from './messages.json';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://kras-react-sfs.now.sh'
  : 'http://localhost:3001';

function requestHandler(req, res) {
  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};
  const html = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StaticRouter location={req.url} context={context}>
        <Pages />
      </StaticRouter>
    </IntlProvider>,
  );

  // const result = context.getResult();

  res.setHeader('Content-Type', 'text/html');

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
        domain={domain}
      />,
    ),
  );
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
