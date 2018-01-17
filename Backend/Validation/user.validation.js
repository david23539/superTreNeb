'use strict'
const constantFile = require('../Constant')

function validationDataNewUser(params) {
	let usuario = params.usuario
	let persona = params.persona

	if(usuario && usuario.nombreUsuario && usuario.password && usuario.dispositivoAsociado && usuario.estado && usuario.navegador) {
		return !!(persona && persona.nombre && persona.apellido1 && persona.email && (persona.movil || persona.telefono))
	}else{
		return false
	}
}

function validationLoginData(params){
    const regexEmail = new RegExp(constantFile.regex.EMAIL)
    const regexNombreUsuario = new RegExp(constantFile.regex.USERNAME)

    return (params.persona && regexEmail.test(params.persona.email)) || (params.usuario && regexNombreUsuario.test(params.usuario.nombreUsuario)) && params.usuario.password

}



// eslint-disable-next-line no-undef
module.exports = {
	validationDataNewUser,
	validationLoginData
}