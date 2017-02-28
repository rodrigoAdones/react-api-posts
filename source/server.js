import http from 'http'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Pages from './pages/containers/Page.jsx'
import Layout from './pages/components/Layout.jsx'

function requestHandler (req, res) {
  const context = {}


  let html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Pages />
    </StaticRouter>
  )

  //const result = context.getResult()

  res.setHeader('Content-Type', 'text/html')

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title='Aplicación'
        content={html}
      />
    )
  )
  res.end()
}

const server = http.createServer(requestHandler)

server.listen(3000)
