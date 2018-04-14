'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
//rutas
const user_routes = require('./routes/user.route')
const category_routes = require('./routes/category.route')
const product_routes = require('./routes/product.router')
const person_router = require('./routes/person.route')
const direcctionIp_router = require('./routes/direcctionIp.route')
const provider_router = require('./routes/provider.router')
//const animal_routes = require('./rutes/animal')

//configurar middlewares de body-pare
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())



//configurar cabeceras y cors
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.header('Allow', 'GET, POST, PUT, DELETE')
	next()
})

//rutas base
// app.use('/', express.static('client', {redirect:false}))
app.use('/api', user_routes)
app.use('/api', person_router)
app.use('/api', direcctionIp_router)
app.use('/api', category_routes)
app.use('/api', product_routes)
app.use('/api', provider_router)
/*app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'))
})*/


//rutas body-parse


// eslint-disable-next-line no-undef
module.exports = app