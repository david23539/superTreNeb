'use strict'

const request = require('request');
const fs = require('fs');
const moment = require('moment-timezone');
const constantFile = require('../utils/Constant');
const path = require('path');




function downloadFile(res, data_IN) {
    const shortId = 'rk6pA17HQ';
    let spain = moment.tz(data_IN._doc.stn_dateCreation,'Europe/Madrid').format('l');

    let data = {
        template: {'shortid': shortId},
        data: {
            'clientData': {
                'date': spain,
                'population': 'Ribera del fresno 06800 (Badajoz)',//necesario guardar el id del cliente
                'direction': 'C/ Media 15',
                'dni': '45799346-X',
                'telephone': '924568695',
                'name': 'Javier Rodriguez Caballero'
            },
            'numberBill': '12233118515',//Necesario guardar el numero de la factura
            'billData': /*[{
                'concept': 'Tomates',
                'unitPrice': 10,
                'unit': 1
            }]*/privateFormatProductToBill(data_IN._doc.stn_dataBill),
            'iva': data_IN._doc.stn_ivaBill
        },
        options: {
            preview: false
        }
    };
    let options = {
        uri: constantFile.urls.URL_REPORT_BILLS,
        method: 'POST',
        json: data
    };

    let nameBills = new Date().getTime().toString() + '.pdf';
    let completeDataBill = fs.createWriteStream('./Backend/bills-data/' + nameBills);
    request(options).pipe(completeDataBill);
    completeDataBill.on('finish', () => {
        res.sendFile(path.resolve('./Backend/bills-data/' + nameBills))
        // return './Backend/bills-data/' + nameBills;
    });
}

/**
 *
 * @param productList_IN
 * [{"idProv":"","namProv":"","idCat":"","namCat":"","nameProd":"Sardina","descProd":"Sardina común","quanProd":1,"pricProd":1.41984}]
 */
function privateFormatProductToBill(productList_IN){
    let productList_OUT = [];
    let finalProductList = JSON.parse(productList_IN);
    for(let item of finalProductList){
        productList_OUT.push({concept:item.nameProd, unitPrice:item.pricProd.toFixed(2), unit:item.quanProd})
    }
    return productList_OUT;
}

module.exports={
    downloadFile
}