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
    format: winston.format.combine(winston.format.colorize(), winston.format.json(), winston.format.prettyPrint())
  })
)

const responseTypesByRequestType = {
  ProductoModificarRequest: 'ProductoModificarResponse',
  ProductoCrearRequest: 'ProductoCrearResponse'
}

app.use('*', (req, res) => {
  console.log('\n' + '=========='.repeat(15))
  console.log('=========='.repeat(15))
  const responseKey = responseTypesByRequestType[Object.keys(req.body)[0]]
  res.send({
    [responseKey]: {Body: req.body}
  })
})

app.listen(8000, () => console.log('Started on port 8000...'))
