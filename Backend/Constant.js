/* eslint-disable no-undef */
'use strict'

//TODO Base de datos
const constant ={
	db:{
		CONNECTION_URL: 'mongodb://localhost:27017/trejo',
		CONNECTION_OK : 'Conexión con la base de datos',
		NODE_EXPRESS_OK: 'El servidor de node y express esta corriendo'
	},
	api:{
		MESSAGE_OK: 'El metodo esta funcionando',
		SERVICE_OK: 'El servicio funciona',
		AUTHENTICATE_FAIL: 'la peticion no tien la cabecera de autenticación',
		EXPIRED_TOKEN:'El token ha expirado',
		NO_VALID_TOKEN: 'El token no es valido',
		ACCESS_DENIED: 'acceso denegado a esta zona'


	},
	httpCode: {
		PETITION_CORRECT: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NO_FOUND: 404,
		CONFLICT: 409,
		INTERNAL_SERVER_ERROR: 500


	},
	functions:{
		ERROR_PARAMETROS_ENTRADA: 'Los parametros de entrada nos son correctos',
		USER_REGISTER_SUCCESS: 'Usuario registrado correctamente',
		USER_LOGIN_SUCCESS_TOKEN: 'Usuario logeado con token correctamente',
		USER_LOGIN_SUCCESS: 'Usuario logeado sin token correctamente',
		USER_REGISTER_ERROR: 'Ha habido un error con el registro del usuario',
		USER_NO_EXIST: 'No existe ningun usuario con estas credenciales o esta bloqueado',
		USER_EXIST: 'Ya existe un uauario con este nombre de usuario o email ',
		ERROR_DROP_OBJECT: 'Error al eliminar objetos',
		SUCCESS_DROP_OBJECT: 'Exito al eliminar objetos',
		ROL_ADMIN:'ROLE_ADMIN',
		ROL_USER:'ROLE_USER',
		USER_BLOCK: 'Usuario bloqueado por exceso de intentos',
		LOGIN_TRY_FAIL: 'aumento en uno el numero de intentos'

	},
	regex:{
		EMAIL:'^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
		USERNAME: '^[0-9a-zA-Z]+$'
	},
	messageLog:{
		ERROR: 'Error en la generacion del logs',
		ERROR_IP: 'ha ocurrido un error con el guardado de la ip',
		SUCCESS_REGISTER_USER: 'Se ha registrado con exito el usuario ',
		SUCCESS_REGISTER_IP: 'Se ha registrado con exito la ip ',
		INFO_IP: 'con ip '
	}
}
module.exports = constant
