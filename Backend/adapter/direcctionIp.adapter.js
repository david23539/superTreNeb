'use strict'

const DirectionIp = require('../model/direcctionIp.model')


function directionIpDataAdapter(params, user) {
	let directionIp = new DirectionIp()
	directionIp.stn_directionIp = params.direccionIp.direccionData
	directionIp.stn_status = true
	directionIp.stn_tryNumber = 0
	directionIp.stn_browser = params.direccionIp.navegador
	directionIp.stn_user = user


	return directionIp


}

// eslint-disable-next-line no-undef
module.exports = {
	directionIpDataAdapter
}