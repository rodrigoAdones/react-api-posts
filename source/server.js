import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'

function requestHandler (req, res) {
  const html = renderToString(
    React.DOM.h1(null, 'Hola Tu')
  )

  res.write(html)
  res.end()
}

const server = http.createServer(requestHandler)

server.listen(3000)
