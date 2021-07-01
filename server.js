var express = require('express')
var cors = require('cors')
var app = express()
const fetch = require('node-fetch')

app.use(cors())

const parseTitle = (body) => {
    let match = body.match(/>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
    if (!match || typeof match[1] !== 'string')
      throw new Error('Unable to parse the title tag')
    return match[1]
  }

app.get('/',async function (req, res) {
    const {url} = req.query;
    if (!url)
    return res.status(400).end('Missing url query parameter')
  
  fetch(url)
    .then(res => res.text())
    .then(body => parseTitle(body))
    .then(title => res.send(title))
    .catch(e => res.status(400).end(e.message)) 
  })

app.listen(5000)