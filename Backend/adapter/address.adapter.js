'use strict';

const Address = require('../model/addressData.model');

function addressDataAdapter(addresParams) {
	let address = new Address();
	address.stn_province = addresParams.provincia;
	address.stn_location = addresParams.poblacion;
	address.stn_typeVia = addresParams.tipoVia;
	address.stn_postalCod = addresParams.codigoPostal;
	address.stn_number = addresParams.numero;
	address.stn_floor = addresParams.piso;
	address.stn_door = addresParams.puerta;
	address.stn_directionName = addresParams.nombreCalle;
	address.stn_status = true;
	return address;
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
		id: address_IN._doc._id
	};
	return address_OUT;

}

function addressDataListOUTAdapter(addressList_IN){
	let adressList_OUT = [];
	for(let item of addressList_IN){
		let address_OUT = {
			provincia : item.stn_province,
			location: item.stn_location,
			tipoVia: item.stn_typeVia,
			codigoPostal: item.stn_postalCod,
			numero: item.stn_number,
			piso: item.stn_floor,
			puerta: item.stn_door,
			nombreCalle: item.stn_directionName,
			id: item._doc._id
		};
		adressList_OUT.push(address_OUT);
	}
	return adressList_OUT;
}

// eslint-disable-next-line no-undef
module.exports = {
	addressDataAdapter,
	addressDataOUTLAdapter,
	addressDataListOUTAdapter
};