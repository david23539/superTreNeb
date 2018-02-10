'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const constantFile = require('./utils/Constant')
const app = express()
//rutas
const user_routes = require('./routes/user.route')
const person_router = require('./routes/person.route')
const direcctionIp_router = require('./routes/direcctionIp.route')
//const animal_routes = require('./rutes/animal')

//configurar middlewares de body-pare
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())



//configurar cabeceras y cors
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
	res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE')
	next()
})
//rutas base
app.use('/api', user_routes)
app.use('/api', person_router)
app.use('/api', direcctionIp_router)
//app.use('/api', animal_routes)

//rutas body-parse

app.post('/probando',(req, res)=>{
	res.status(200).send({message: constantFile.api.MESSAGE_OK})
})

// eslint-disable-next-line no-undef
module.exports = app