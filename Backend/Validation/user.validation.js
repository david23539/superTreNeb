/* eslint-disable security/detect-non-literal-regexp,security/detect-non-literal-regexp */
'use strict'
const constantFile = require('../utils/Constant')

function validationDataNewUser(params) {
	let usuario = params.usuario
	let persona = params.persona
	let direccion = params.direccionIp

	if (usuario && usuario.nombreUsuario && usuario.password && usuario.estado && direccion && direccion.direccionData && direccion.navegador) {
		return !!(persona && persona.nombre && persona.apellido1 && persona.email && (persona.movil || persona.telefono))
	} else {
		return false
	}

}



function validationLoginData(params){
	const regexEmail = new RegExp(constantFile.regex.EMAIL)
	const regexNombreUsuario = new RegExp(constantFile.regex.USERNAME)

	if(params.usuario && regexNombreUsuario.test(params.usuario.nombreUsuario) && params.usuario.password){
		params.type = 'usuario'
	}else if(params.persona && regexEmail.test(params.persona.email) && params.usuario.password){
		params.type = 'persona'
	}else{
		return false
	}
	return true
}



// eslint-disable-next-line no-undef
module.exports = {
	validationDataNewUser,
	validationLoginData
}