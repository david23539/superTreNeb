'use strict'
const constantFile = require('../utils/Constant')
const jimp = require('jimp')
const auditoriaController = require('../controller/saveLogs.controller')
const fs = require('fs')

function validateImageFile(file){
	const file_path = file.path
	const file_split = file_path.split('/')
	const file_name = file_split[3]
	// const file_name = file_split[4] desarrollo
	// eslint-disable-next-line no-useless-escape
	const ext_split = file_name.split('.')
	const file_ext = ext_split[1]
	if(file_ext === constantFile.extensions.JPEG ||file_ext === constantFile.extensions.JPG || file_ext === constantFile.extensions.PNG){
		return file_name
	}else{
		fs.unlink(file_path,(err)=>{
			if (err){
				return false
			}else{
				return false
			}
		})

	}

}

function resizeImage(req, routeOriginal, routeResized){

	jimp.read(routeOriginal,(err, image)=>{
		if(err || !image){
            auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'image fail')
			return false;
		}else{
			return image.resize(32,32).write(routeResized)
		}
	})
}
// eslint-disable-next-line no-undef
module.exports={
	validateImageFile,
	resizeImage
}