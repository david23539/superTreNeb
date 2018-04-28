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
	person.stn_status = true
	person.stn_fk_address = null != personaParams.direccion.provincia ? addressAdapter.addressDataAdapter(personaParams.direccion) : personaParams.direccion
	return person
}

function personDataAdapterIN(personaParams_IN){
	let person_OUT = new Person()
	person_OUT.stn_name = personaParams_IN.nombre
	person_OUT.stn_lastname1 = personaParams_IN.apellido1
	person_OUT.stn_lastname2 = personaParams_IN.apellido2
	person_OUT.stn_mobile = personaParams_IN.movil
	person_OUT.stn_telephone = personaParams_IN.telefono
	person_OUT.stn_dni = personaParams_IN.dni
	person_OUT.stn_email = personaParams_IN.email
	person_OUT.stn_image = personaParams_IN.image
	person_OUT.stn_status = true
	person_OUT.stn_fk_address = personaParams_IN.direcction
	return person_OUT
}

function personDataOUTAdapter(person_IN){
	let personOUT = {
		nombre:person_IN.stn_name,
		apellido1:person_IN.stn_lastname1,
		apellido2:person_IN.stn_lastname2,
		movil:person_IN.stn_mobile,
		telefono:person_IN.stn_telephone,
		dni:person_IN.stn_dni,
		email:person_IN.stn_email,
		image:person_IN.stn_image,
		direccion:addressAdapter.addressDataOUTLAdapter(person_IN.stn_fk_address)
	}
	return personOUT
}


// eslint-disable-next-line no-undef
module.exports = {
	personDataAdapter,
	personDataOUTAdapter,
	personDataAdapterIN
}