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
		SERVICE_OK: 'El servicio funciona',


	},
	httpCode: {
		PETICION_CORRECTA: 200,
		BAD_REQUEST: 400,
		CONFLIC: 409,
		INTERNAL_SERVER_ERROR: 500
	},
	functions:{
		ERROR_PARAMETROS_ENTRADA: 'Los parametros de entrada nos son correctos',
		USER_REGISTER_SUCCESS: 'Usuario registrado correctamente',
		USER_REGISTER_ERROR: 'Ha habido un error con el registro del usuario',
		USER_NO_EXIST: 'No existe ningun usuario con este email o nombre de usuario',
		USER_EXIST: 'Ya existe un uauario con este nombre de usuario o email ',
		ERRO_DROP_OBJECT: 'Error al eliminar objetos',
		SUCCES_DROP_OBJECT: 'Exito al eliminar objetos',

	},
	messageLog:{
		ERROR: 'Error en la generacion del logs',
		SUCCESS_REGISTER_USER: 'Se ha registrado con exito el usuario ',
		INFO_IP: 'con ip '
	}
}
module.exports = constant
