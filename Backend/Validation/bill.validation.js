'use strict';
const constantFile = require('../utils/Constant');

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES);
const regexNumbers = new RegExp(constantFile.regex.NUMBERS);
const regexNumbersAndDecimal = new RegExp(constantFile.regex.NUMBERS_AND_DECIMAL);

function validationBillData_IN(BillModel_IN){
	return (BillModel_IN.stn_nameClient && regexString.test(BillModel_IN.stn_nameClient)) && privateAnalizeBodyBill(BillModel_IN.stn_dataBill) && (BillModel_IN.stn_type && regexString.test(BillModel_IN.stn_type))
	&& (BillModel_IN.stn_payStatus===true || BillModel_IN.stn_payStatus===false) && (BillModel_IN.stn_closed===true || BillModel_IN.stn_closed===false)
		&& (BillModel_IN.stn_status===true || BillModel_IN.stn_status===false) && (regexNumbers.test(BillModel_IN.stn_ivaBill));
}

function privateAnalizeBodyBill(data){
	let dataContentBill = JSON.parse(data);
	for (let item of dataContentBill){
		//campos obligatorios
		if((item.descProd && regexString.test(item.descProd)) && (item.nameProd && regexString.test(item.nameProd)) && (item.pricProd && regexNumbersAndDecimal.test(item.pricProd.toFixed(2))) && (item.quanProd && regexNumbers.test(item.quanProd))){
			//campos opcionales id categoria
			if(item.idCat && !regexString.test(item.idCat)){
				return false;
			}
			//id proveedor
			if(item.idProv && !regexString.test(item.idProv)){
				return false;
			}
			// nombre Categoria
			if(item.namCat && !regexString.test(item.namCat)){
				return false;
			}
			// nombre Proveedor
			if(item.namProv && !regexString.test(item.namProv)){
				return false;
			}

		}else{
			return false;
		}
	}
	return true;
}

module.exports ={
	validationBillData_IN
};

