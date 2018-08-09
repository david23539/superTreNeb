'use strict';

const BillModel = require('../model/bill.model');
const moment = require('moment');

function adapterBill_IN(billParams_IN){
	let billModel_IN = new BillModel();
	billModel_IN.stn_nameClient = billParams_IN.data.nombreClient;
	billModel_IN.stn_ivaBill = billParams_IN.data.ivaBill?billParams_IN.data.ivaBill:0;
	billModel_IN.stn_dataBill = billParams_IN.data.bodyBill;
	billModel_IN.stn_type = billParams_IN.data.tipoBill;
	if(!billParams_IN.data.update){
		billModel_IN.stn_dateCreation = new Date();
	}
	billModel_IN.stn_dateLastModify = billParams_IN.data.cierreDateBill;
	billModel_IN.stn_payStatus = billParams_IN.data.pagado;
	billModel_IN.stn_closed = billParams_IN.data.cerrado;
	billModel_IN.stn_status = true;
	return billModel_IN;
}

function adapterListBill_OUT(billList_IN){
	let adaptationBills = [];
	for(let item of billList_IN){
		let bill = {
			client: item._doc.stn_nameClient._doc.stn_name + ' ' + item._doc.stn_nameClient._doc.stn_lastname1
            	+ ' ' + item._doc.stn_nameClient._doc.stn_lastname2,
			status: item._doc.stn_payStatus?'Pagada':(item._doc.stn_closed?'Cerrada':'Abierta'),
			type: item._doc.stn_type,
			number: item._doc.stn_number,
			creationDate: moment(item._doc.stn_dateCreation).format('LLL'),
			closingDate: item._doc.stn_dateLastModify?moment(item._doc.stn_dateLastModify).format('LLL'):'',
			price: item.stn_ivaBill?privateCalculatePrice(item._doc.stn_dataBill,item.stn_ivaBill).toFixed(2):privateCalculatePrice(item._doc.stn_dataBill).toFixed(2),
			id: item._doc._id
		};
		adaptationBills.push(bill);
	}
	return adaptationBills;
}

function adapterBill_OUT(bill_IN){
	let bill = {
		data : JSON.parse(bill_IN._doc.stn_dataBill),
		client: bill_IN._doc.stn_nameClient._doc.stn_name +' '+ bill_IN._doc.stn_nameClient._doc.stn_lastname1
        +' '+ bill_IN._doc.stn_nameClient._doc.stn_lastname2,
		idClient:bill_IN._doc.stn_nameClient._id,
		id: bill_IN._doc._id
	};
	return bill;
}

function privateCalculatePrice(data, iva=null){
	let dataContentBill = JSON.parse(data);
	let price = 0;
	for (let item of dataContentBill){
		price += item.pricProd * item.quanProd;
	}
	if(iva){
		let costIva = (price *iva)/100;
		return price + costIva;
	}else return price;

}

module.exports = {
	adapterBill_IN,
	adapterListBill_OUT,
	adapterBill_OUT
};