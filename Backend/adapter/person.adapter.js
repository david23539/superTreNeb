'use strict'
const Person = require('../model/personData.model')
const addressAdapter = require('./address.adapter')

function personDataAdapter(personaParams) {
	let person = new Person()
	person.stn_name = personaParams.nombre
	person.stn_lastname1 = personaParams.apellido1
	person.stn_lastname2 = personaParams.apellido2
	person.stn_mobile = personaParams.movil
	person.stn_telephone = personaParams.telefono
	person.stn_dni = personaParams.dni
	person.stn_email = personaParams.email
	person.stn_image = personaParams.image
	person.stn_fk_address = addressAdapter.addressDataAdapter(personaParams.direccion)

	return person
}


// eslint-disable-next-line no-undef
module.exports = {
	personDataAdapter
}