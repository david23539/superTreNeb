'use strict'
const constantFile = require('../utils/Constant')

const regexStringWhithSpaces = new RegExp(constantFile.regex.STRINGS_WITH_SPACES)
const regexString = new RegExp(constantFile.regex.STRINGS)

function validateProvider(provider_IN){
	return ((provider_IN.stn_businessName && regexStringWhithSpaces.test(provider_IN.stn_businessName)) && validatePersonsProviders(provider_IN) &&
		(provider_IN.stn_nifBussines && regexString.test(provider_IN.stn_nifBussines)) && validateAddressProvider(provider_IN) && validateCategoriesProvider(provider_IN))
}

function validatePersonsProviders(provider_IN){
	return (provider_IN.stn_responsiblePerson && regexString.test(provider_IN.stn_responsiblePerson)) && (provider_IN.stn_contactPerson && regexString.test(provider_IN.stn_contactPerson))
}

function validateAddressProvider(provider_IN){
	return (provider_IN.stn_addressFkBussiness && regexString.test(provider_IN.stn_addressFkBussiness))
}

function validateCategoriesProvider(provider_IN){
	if(provider_IN.stn_categoryFk.length > 0){
		let test = true
		for(let item of provider_IN.stn_categoryFk){
			if(!regexString.test(item)){
				test = false
				break
			}
		}
		return test
	}


}

// eslint-disable-next-line no-undef
module.exports = {
	validateProvider
}