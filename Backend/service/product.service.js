'use strict'
const constantFile = require('../utils/Constant')
const jimp = require('jimp')
const auditoriaController = require('./saveLogs.controller')

function validateImageFile(file){
	const file_path = file.path
	const file_split = file_path.split('\\')
	const file_name = file_split[4]
	// eslint-disable-next-line no-useless-escape
	const ext_split = file_name.split('\.')
	const file_ext = ext_split[1]
	if(file_ext === constantFile.extensions.JPEG ||file_ext === constantFile.extensions.JPG || file_ext === constantFile.extensions.PNG){
		return file_name
	}else{
		return false
	}

}

function resizeImage(req, res, routeOriginal, routeResized){
	jimp.read(routeOriginal,(err, image)=>{
		if(err || !image){
			auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params.direccionIp.navegador)
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR})
		}else{
			image.resize(10,10).write(routeResized)
		}
	})
}
module.exports={
	validateImageFile,
	resizeImage
}