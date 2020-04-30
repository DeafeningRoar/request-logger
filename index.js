const express = require('express')
const bodyParser = require('body-parser')
const expressWinston = require('express-winston')
const winston = require('winston')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

expressWinston.requestWhitelist.push('body')
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console(), new winston.transports.File({filename: 'combined.log'})],
    format: winston.format.combine(winston.format.colorize(), winston.format.json(), winston.format.prettyPrint()),
  })
)

app.use('*', (req, res) => {
  console.log('\n' + '=========='.repeat(15))
  console.log('=========='.repeat(15))
  res.send({
    headers: req.headers,
    body: req.body,
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Started on port ${PORT}...`))
