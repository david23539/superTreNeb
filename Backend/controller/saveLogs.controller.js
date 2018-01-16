'use strict'
const Auditory = require('../model/auditory.model')
const auditoryAdapter = require('../adapter/auditory.adapter')
const Log = require('log'), log = new Log('info')
const constantFile = require('../Constant')

function saveLogsData(username, messaje, ip, browser){

	let auditory = new Auditory()
	auditory = auditoryAdapter.auditoryLogs(username, messaje,ip,browser)
	auditory.save((err, auditoryStorage)=>{
		if(err){
			log.error(err)
		}else if(!auditoryStorage){
			log.err(constantFile.messageLog.ERROR)
		}
	})




}

// eslint-disable-next-line no-undef
module.exports = {
	saveLogsData
}