'use strict';

const constantFile = require('../utils/Constant');

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES);
const regexNumbers = new RegExp(constantFile.regex.NUMBERS_AND_DECIMAL);

function validationProductDataComplete(product){
    if(regexString.test(product.stn_nameProduct) &&
        regexString.test(product.stn_categoryFk)  && privateValidationProductDataNumberComplete(product) ){
      return privateValidationProductDataOpcionalComplete(product);
    }else{
        return false;
    }
}


function privateValidationProductDataNumberComplete(product){
    return regexNumbers.test(product.stn_costProduct) && regexNumbers.test(product.stn_referenceProduct)
        && regexNumbers.test(product.stn_ivaProduct) && regexNumbers.test(product.stn_marginProduct) &&
        regexNumbers.test(product.stn_stockProduct) && regexNumbers.test(product.stn_stockProductMin);
}

function privateValidationProductDataOpcionalComplete(product){
    if(!product.stn_descriptionProduct && !product.stn_imageProduct){
        return true;
    }else if(product.stn_descriptionProduct && !product.stn_imageProduct){
        return regexString.test(product.stn_descriptionProduct);
    }else if(!product.stn_descriptionProduct && product.stn_imageProduct){
        return regexString.test(product.stn_imageProduct);
    }else if(product.stn_descriptionProduct && product.stn_imageProduct){
        return regexString.test(product.stn_imageProduct) && regexString.test(product.stn_descriptionProduct);
    }
}

function checkIdsProduct(productsId){
	for(let idProduct of productsId.ids){
		let result = regexString.test(idProduct);
		if(!result){
			return false;
		}
	}
	return true;
}

function validationCodeProduct(code){
    let CodRef = code.trim();
    if('number' === typeof(CodRef)){
       return regexNumbers.test(CodRef);
    }else if('string' === typeof(CodRef)){
        let num = isNaN(parseInt(CodRef)) ? 0 : parseInt(CodRef);
        if(num !== 0){
           return regexNumbers.test(CodRef);
        }else{
            return false;
        }
    }
}



module.exports = {
    validationProductDataComplete,
    validationCodeProduct,
	checkIdsProduct
};