'use strict';

const BillModel = require('../model/bill.model');

function adapterBill_IN(billParams_IN){
	let billModel_IN = new BillModel();
	billModel_IN.stn_nameClient = billParams_IN.data.nombreClient;
	billModel_IN.stn_ivaBill = billParams_IN.data.ivaBill?billParams_IN.data.ivaBill:0;
	billModel_IN.stn_dataBill = billParams_IN.data.bodyBill;
	billModel_IN.stn_type = billParams_IN.data.tipoBill;
	billModel_IN.stn_dateCreation = new Date();
	billModel_IN.stn_dateClosed = billParams_IN.data.cierreDateBill;
	billModel_IN.stn_payStatus = billParams_IN.data.pagado;
	billModel_IN.stn_closed = billParams_IN.data.cerrado;
	billModel_IN.stn_status = true;
	return billModel_IN;
}

module.exports = {
	adapterBill_IN
};