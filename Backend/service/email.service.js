/* eslint-disable no-undef,security/detect-non-literal-fs-filename */
'use strict'
const nodemailer = require('nodemailer')
const auditoriaController = require('../controller/saveLogs.controller')
const fs = require('fs')


function sendMailChangeIp(params, templateUrl, direccionEmailDestinatario ){
	const template = fs.readFileSync(__dirname + templateUrl, 'utf8')
	// eslint-disable-next-line no-unused-vars
	nodemailer.createTestAccount((err, account) => {

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'Gmail',

			secure: false, // true for 465, false for other ports
			auth: {
				user: 'david23539@gmail.com', // generated ethereal user
				pass: 'fasT7C!*AgAt'  // generated ethereal password
			}
		})

		// setup email data with unicode symbols
		let mailOptions = {
			from: 'david23539@gmail.com', // sender address
			to: direccionEmailDestinatario, // list of receivers
			subject: 'Posible Ataque', // Subject line
			text: '¿Has sido tu?', // plain text body
			html: template // html body
		}

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				auditoriaController.saveLogsData(params.usuario.nombreUsuario, error,params.direccionIp.direccionData, params.direccionIp.navegador)
			}else{
				auditoriaController.saveLogsData(params.usuario.nombreUsuario, nodemailer.getTestMessageUrl(info),params.direccionIp.direccionData, params.direccionIp.navegador)
			}

		})
	})
}

function sendMail(params, template, email){
	this.sendMailChangeIp(params, template, email)
}

// eslint-disable-next-line no-undef
module.exports={
	sendMailChangeIp,
	sendMail
}