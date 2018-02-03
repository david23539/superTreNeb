'use strict'

function getHtmlCodeVerification(code){
	let htmlHead = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"><title>Code Validation</title>' +
		'<style> .text{ text-align: center;color: #7A98B6; font-family: "Arial"; .container{height: 70vh;' +
		' background-color: #ECF0FE ;border-radius: 2%;box-shadow: 5px 10px 50px #B7BBC8;padding-top: 15%;}' +
		'.code{color:blue; font-weight: bold;font-size: large;}h4{color:#C7A4A4;}</style></head>'
	let htmlBody = '<body><div class="container"><div><h1 class="text">Código verificación</h1>' +
		'<h3 class="text">Has solicitado un nuevo código para recuperar o la contraseña perdida o desbloquear al usuario</h3>' +
		'</div><div class="text "><h4>Si usted no ha solicitado este código no es necesario hacer nada de lo contrario ingrese ' +
		'el siguiente código en el lugar correspondiente de la página  de recuperación de contraseña </h4>' +
		'<p>Su código es: <span class="code">'+code+'</span></p><p>Una vez usado ya no podrá usarse mas veces.</p>' +
		'</div></div></body></html>'
	return htmlHead+htmlBody
}

// eslint-disable-next-line no-undef
module.exports={
	getHtmlCodeVerification
}