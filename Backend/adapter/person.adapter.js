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
		direccion:addressAdapter.addressDataOUTLAdapter(person_IN._doc.stn_fk_address),
		image:person_IN.stn_image,
		id:person_IN._doc._id

	}
	return personOUT
}

function personList_OUT_Adapter(personsList_IN){
	let persons_OUT = []
	for(let item of personsList_IN){
		let person = {
			name: item.stn_name,
			lastName: item.stn_lastname1,
			lastName2: item.stn_lastname2,
			dni: item.stn_dni,
			telefone: item.stn_telephone,
			movil: item.stn_mobile,
			email: item.stn_email,
			image: item.stn_image,
			id : item._doc._id,
			direccion:addressAdapter.addressDataOUTLAdapter(item.stn_fk_address)
		}
		persons_OUT.push(person)
	}
	return persons_OUT
}


// eslint-disable-next-line no-undef
module.exports = {
	personDataAdapter,
	personDataOUTAdapter,
	personDataAdapterIN,
	personList_OUT_Adapter
}