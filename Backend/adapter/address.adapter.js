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
	return address


}

// eslint-disable-next-line no-undef
module.exports = {
	addressDataAdapter
}