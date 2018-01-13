/* eslint-disable no-undef */
'use strict'

//TODO Base de datos
const constant ={
	db:{
		conectionUrl: 'mongodb://localhost:27017/trejo',
		CONEXION_OK : 'Conexión con la base de datos',
		NODE_EXPRESS_OK: 'El servidor de node y express esta corriendo'
	},
	api:{
		MESSAGE_OK: 'El metodo esta funcionando',
		SERVICE_OK: 'El servicio funciona'

	}
}
module.exports = constant
