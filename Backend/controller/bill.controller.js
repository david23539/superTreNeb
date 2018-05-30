/* eslint-disable indent */
'use strict';

const constantFile = require('../utils/Constant');
const validationGlobal = require('../Validation/global.validation');
const ProviderModel = require('../model/provider.model');
const auditoriaController = require('./saveLogs.controller');
const CategoriesModel = require('../model/category.model');
const categoryAdapter = require('../adapter/category.adapter');
const ProductModel = require('../model/product.model');
const adapterProduct = require('../adapter/product.adapter');
const BillModel = require('../model/bill.model');
const adapterBill = require('../adapter/bill.adapter');
const validationBill = require('../Validation/bill.validation');
const validationBrowser = require('../Validation/global.validation');





let max = 0;

function createBill(req, res){
    let params_IN = req.body;
    let billModel_In = adapterBill.adapterBill_IN(params_IN);
    if((validationBill.validationBillData_IN(billModel_In)) && (validationBrowser.validateId(params_IN.direccionIp.navegador))){
		billModel_In.save((err, bill_OUT)=>{
// eslint-disable-next-line no-mixed-spaces-and-tabs
		   if(err || !bill_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params_IN.direccionIp.navegador);
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILL_ERROR});
           }else{
				auditoriaController.saveLogsData(req.user.name,constantFile.functions.BILL_SUCCESS, req.connection.remoteAddress, params_IN.direccionIp.navegador);
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.BILL_SUCCESS});
			}
        });
    }else{
		paramsIvalids(res);
    }
}

function getCategoriesByProvider(req, res){
    let params_IN = req.params.idProvider;
    if(validationGlobal.validateId(params_IN)){
       ProviderModel.findById(params_IN, (err, provider_OUT)=>{
           if(err){
               auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getCategoryByProvider');
               res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR});
           }else if(!provider_OUT){
               res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_CATEGORY_AVAIBLE});
           }else{
                privatePrepareCategories(provider_OUT.stn_categoryFk, res);
           }
       });
    }else{
        paramsIvalids(res);

    }

}

function privatePrepareCategories(categoriesId_IN, res){
    max = categoriesId_IN.length;
    let dataCategories = [];
    for(let item of categoriesId_IN){
        CategoriesModel.findById(item, (err, category_OUT)=>{
            if(err || !category_OUT){
                privateReturnErrorList(res);
                return;
            }else{
                dataCategories.push(category_OUT);
                if(max === dataCategories.length){
                    privateReturnListCategories(dataCategories, res);
                }
            }
        });
    }
}

function privateReturnListCategories(categories_IN, res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({categories: categoryAdapter.getAllCategoriesAdapter(categories_IN)});

}


function privateReturnErrorList(res){
    res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR});
}

function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA});
}

function getProductsByCategory(req, res){
   let params_IN = req.params.idCategory;
   if(validationGlobal.validateId(params_IN)){
       ProductModel.find({stn_categoryFk:params_IN, stn_deleteProduct:false}).populate({path:'stn_categoryFk'}).exec((err, productsList_OUT)=>{
          if(err){
              auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getProductByCategory');
              res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR});
          }else if(productsList_OUT.length === 0){
              res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_PRODUCT_AVAIBLE});
          }else{
              res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapterListProduct_OUT(productsList_OUT)});
          }
       });
   }else{
       paramsIvalids(res);
   }

}

function getAllBill(req, res){
    let params_IN = req.body;
    if(validationBrowser.validationPage(params_IN.pagination.page) && validationBrowser.validateId(params_IN.direccionIp.navegador)){
        BillModel.find({stn_status:true})
			.skip(params_IN.pagination.page)
			.limit(10)
            .exec((err, bills_OUT)=>{
               if(err){
                   auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params_IN.direccionIp.navegador);
                   res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_GET_ERROR});
               }else if(bills_OUT.length === 0){
                   auditoriaController.saveLogsData(req.user.name,constantFile.functions.NO_BILLS_AVAIBLE, req.connection.remoteAddress, params_IN.direccionIp.navegador);
                   res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_BILLS_AVAIBLE});
               }else{
				   countBills((err, countBill)=>{
				       if(err || !countBill){
						   auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, params_IN.direccionIp.navegador);
						   res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_GET_ERROR});
                       }else{
				           res.status(constantFile.httpCode.PETITION_CORRECT).send({bills: adapterBill.adapterBill_OUT(bills_OUT), count:countBill});
                       }
                   });
               }
            });
    }else{
		paramsIvalids(res);
    }

}

function countBills(cb){
	BillModel.count({stn_status:true}, cb);
}


module.exports ={
    getCategoriesByProvider,
	getProductsByCategory,
	createBill,
	getAllBill
};