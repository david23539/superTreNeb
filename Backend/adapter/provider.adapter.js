/* eslint-disable no-undef */
'use strict'

const ProviderModel = require('../model/provider.model')
const adapterCategory = require('./category.adapter')
const adapterAddress = require('./address.adapter')
const adapterPerson = require('./person.adapter')



function adapterProvider(provider_IN){
	const provider_OUT = new ProviderModel()
	provider_OUT.stn_businessName = provider_IN.reasonSocial
	provider_OUT.stn_responsiblePerson = provider_IN.resposiblePerson
	provider_OUT.stn_contactPerson = provider_IN.contactPerson
	provider_OUT.stn_nifBussines = provider_IN.nifBusiness
	provider_OUT.stn_addressFkBussiness = provider_IN.localizationBussiness
	provider_OUT.stn_categoryFk = provider_IN.relationatedCategories
	provider_OUT.stn_status = true
	return provider_OUT
}

function adapterOutListProvider(providers_IN){
	let providers_OUT = []
	for(let item of providers_IN){
		let provider = {
			nameBusiness: item.stn_businessName,
			responsible: adapterPerson.personDataOUTAdapter(item._doc.stn_responsiblePerson),
			contact: adapterPerson.personDataOUTAdapter(item._doc.stn_contactPerson),
			nif: item.stn_nifBussines,
			address: adapterAddress.addressDataOUTLAdapter(item._doc.stn_addressFkBussiness),
			categoryProvider : adapterCategory.getAllCategoriesAdapter(item._doc.stn_categoryFk),
			id : item._doc._id
		}
		providers_OUT.push(provider)
	}
	return providers_OUT
}

function adapterOUTListByPerson(providers_IN){
	let providers_OUT = []
	for(let item of providers_IN){
		let provider = {
			contact: item._doc.stn_contactPerson._doc._id,
			responsible: item._doc.stn_responsiblePerson._doc._id,
			id:item._doc._id
		}
		providers_OUT.push(provider)
	}
	return providers_OUT
}

module.exports={
	adapterProvider,
	adapterOutListProvider,
	adapterOUTListByPerson
}