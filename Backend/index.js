
'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/trejo', (err, res)=>{
	if(err){
		throw err
	}else{

		console.log('Se ha establecido la conexion a la base de datos', res)
	}
})
