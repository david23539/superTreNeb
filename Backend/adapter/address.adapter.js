'use strict'

const Address = require('../model/addressData.model')

function addressDataAdapter(addresParams) {
	let address = new Address()
	address.stn_province = addresParams.provincia
	address.stn_location = addresParams.poblacion
	address.stn_typeVia = addresParams.tipoVia
	address.stn_postalCod = addresParams.codigoPostal
	address.stn_number = addresParams.numero
	address.stn_floor = addresParams.piso
	address.stn_door = addresParams.puerta
	address.stn_directionName = addresParams.nombreCalle
	return address
}

function addressDataOUTLAdapter(address_IN){
	let address_OUT = {
		provincia : address_IN.stn_province,
		location: address_IN.stn_location,
		tipoVia: address_IN.stn_typeVia,
		codigoPostal: address_IN.stn_postalCod,
		numero: address_IN.stn_number,
		piso: address_IN.stn_floor,
		puerta: address_IN.stn_door,
		nombreCalle: address_IN.stn_directionName,
	}
	return address_OUT;

}

// eslint-disable-next-line no-undef
module.exports = {
	addressDataAdapter,
	addressDataOUTLAdapter
}