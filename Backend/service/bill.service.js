'use strict'

const request = require('request');
const fs = require('fs');
const moment = require('moment-timezone');
const constantFile = require('../utils/Constant');
const path = require('path');




function downloadFile(res, data_IN) {
    const shortId = 'rk6pA17HQ';
    let spain = moment.tz(data_IN._doc.stn_dateCreation,'Europe/Madrid').format('DD-MM-YYYY');

    let data = {
        template: {'shortid': shortId},
        data: {
            'clientData': {
                'date': spain,
                'population': data_IN._doc.stn_nameClient._doc.stn_fk_address._doc.stn_location,//necesario guardar el id del cliente
                'direction': 'C/ '+ data_IN._doc.stn_nameClient._doc.stn_fk_address._doc.stn_directionName
                    + ' '+data_IN._doc.stn_nameClient._doc.stn_fk_address._doc.stn_number + ' ' +
                    data_IN._doc.stn_nameClient._doc.stn_fk_address._doc.stn_floor + ' ' +
                    data_IN._doc.stn_nameClient._doc.stn_fk_address._doc.stn_door,
                'dni': data_IN._doc.stn_nameClient._doc.stn_dni,
                'telephone': data_IN._doc.stn_nameClient._doc.stn_telephone,
                'name': data_IN._doc.stn_nameClient._doc.stn_name + ' ' + data_IN._doc.stn_nameClient._doc.stn_lastname1
                    + ' ' + data_IN._doc.stn_nameClient._doc.stn_lastname2
            },
            'numberBill': data_IN._doc.stn_number,//Necesario guardar el numero de la factura
            'billData': privateFormatProductToBill(data_IN._doc.stn_dataBill),
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

    /*let nameBills = new Date().getTime().toString() + '.pdf';
    let completeDataBill = fs.createWriteStream('./Backend/bills-data/' + nameBills);
    request(options).pipe(completeDataBill);
    completeDataBill.on('finish', () => {
        res.sendFile(path.resolve('./Backend/bills-data/' + nameBills))
        // return './Backend/bills-data/' + nameBills;
    });*/
    request(options).pipe(res);
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