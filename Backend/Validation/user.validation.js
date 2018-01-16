'use strict'


function validationDataNewUser(params) {
	let usuario = params.usuario
	let persona = params.persona

	if(usuario && usuario.nombreUsuario && usuario.password && usuario.dispositivoAsociado && usuario.estado && usuario.navegador) {
		return !!(persona && persona.nombre && persona.apellido1 && persona.email && (persona.movil || persona.telefono))
	}else{
		return false
	}
}



// eslint-disable-next-line no-undef
module.exports = {
	validationDataNewUser
}