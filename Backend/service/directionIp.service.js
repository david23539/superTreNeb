/* eslint-disable security/detect-object-injection */
'use strict'
const DirectionIp = require('../model/direcctionIp.model')


function seteoDataIp(params, userStorage){
	let ipObject = new DirectionIp()
	ipObject.stn_user = userStorage
	ipObject.stn_directionIp = params.direccionIp.direccionData
	ipObject.stn_browser = params.direccionIp.navegador
	ipObject.stn_status = true
	ipObject.stn_tryNumber = 0
	return ipObject
}

function compareIps(ipParam, ipData) {
	let data = ipData
	for (let i = 0; i <=data.length; i++){
		if(ipParam === data[0][i]){
			return true
		}
	}
	return false
}



// eslint-disable-next-line no-undef
module.exports={
	seteoDataIp,
	compareIps
}