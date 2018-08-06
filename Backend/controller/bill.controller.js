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
const serviceBill = require('../service/bill.service');






let max = 0;

function createBill(req, res){
    let params_IN = req.body;
    if(!params_IN.identifier.id) {
		let billModel_In = adapterBill.adapterBill_IN(params_IN);
		if ((validationBill.validationBillData_IN(billModel_In)) && (validationBrowser.validateId(params_IN.direccionIp.navegador))) {
			billModel_In.save((err, bill_OUT) => {
// eslint-disable-next-line no-mixed-spaces-and-tabs
				if (err || !bill_OUT) {
					auditoriaController.saveLogsData(req.user.name, err, req.connection.remoteAddress, params_IN.direccionIp.navegador);
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILL_ERROR});
				} else {
					auditoriaController.saveLogsData(req.user.name, constantFile.functions.BILL_SUCCESS, req.connection.remoteAddress, params_IN.direccionIp.navegador);
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.BILL_SUCCESS});
				}
			});
		} else {
			paramsIvalids(res);
		}
	}else{
    	updateBill(req, res, params_IN);
	}
}

function updateBill(req, res, params_IN){
	let billModel_In = adapterBill.adapterBill_IN(params_IN);
	if ((validationBill.validationBillData_IN(billModel_In)) && (validationBrowser.validateId(params_IN.direccionIp.navegador)) && (validationBrowser.validateId(params_IN.identifier.id))) {
		billModel_In._doc._id = params_IN.identifier.id;
		BillModel.findByIdAndUpdate(params_IN.identifier.id, billModel_In, {new:true}, (err, billUpdate_OUT)=>{
			if(err || !billUpdate_OUT){
				auditoriaController.saveLogsData(req.user.name, err, req.connection.remoteAddress, params_IN.direccionIp.navegador);
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILL_UPDATE_ERROR});
			}else{
				auditoriaController.saveLogsData(req.user.name, constantFile.functions.BILL_UPDATE_SUCCESS, req.connection.remoteAddress, params_IN.direccionIp.navegador);
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.BILL_UPDATE_SUCCESS});
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

function deleteBill(req, res){
	let params_IN = req.params.idBill;
	if(validationBrowser.validateId(params_IN)){
		BillModel.findByIdAndUpdate(params_IN, {stn_status:false},{new:true},(err, billDeleted_OUT)=>{
			if(err || !billDeleted_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'deletedBillError');
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_DELETED_ERROR});
			}else{
				auditoriaController.saveLogsData(req.user.name, constantFile.functions.BILL_DELETED_SUCCESS, req.connection.remoteAddress, 'deletedBillSuccess');
				res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.BILL_DELETED_SUCCESS});
			}
		});
	}else{
		paramsIvalids(res);
	}
}

function filterBill(req, res){
	const keyword = req.params.key;
	if(validationGlobal.validateId(keyword)){
		BillModel.find({stn_nameClient:{$regex: keyword, $options: 'i'}, stn_status:true})
			.limit(10)
			.exec((err, bills_OUT)=>{
				if(err){
					auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getBillFilterError');
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_GET_ERROR});
				}else if(bills_OUT.length === 0){
					auditoriaController.saveLogsData(req.user.name,constantFile.functions.NO_BILLS_AVAIBLE, req.connection.remoteAddress, 'getFilterBillSuccessEmpty');
					res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_BILLS_AVAIBLE});
				}else{
					res.status(constantFile.httpCode.PETITION_CORRECT).send({bills: adapterBill.adapterListBill_OUT(bills_OUT)});
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
				           res.status(constantFile.httpCode.PETITION_CORRECT).send({bills: adapterBill.adapterListBill_OUT(bills_OUT), count:countBill});
                       }
                   });
               }
            });
    }else{
		paramsIvalids(res);
    }

}

function getBillById(req, res){
	const params_IN = req.params.idBill;
	if(validationBrowser.validateId(params_IN)){
		BillModel.findById(params_IN).where({stn_status:true}).exec((err, bill_OUT)=>{
			if(err || !bill_OUT){
				auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getBillById');
				res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_GET_ERROR});
			}else{
				res.status(constantFile.httpCode.PETITION_CORRECT).send({bills: adapterBill.adapterBill_OUT(bill_OUT)});
			}
		});
	}else{
		paramsIvalids(res);
	}
}

function countBills(cb){
	BillModel.count({stn_status:true}, cb);
}



function downloadBill(req, res) {
	let params_IN = req.params.id;
    if(validationBrowser.validateId(params_IN)){
        BillModel.findById(params_IN).where({stn_status:true}).exec((err, bill_OUT)=>{
            if(err || !bill_OUT){
                auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getBillById');
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.BILLS_GET_ERROR});
            }else{
                // res.status(constantFile.httpCode.PETITION_CORRECT).send(serviceBill.downloadFile(bill_OUT));
                // res.sendFile(path.resolve(serviceBill.downloadFile(bill_OUT)));
                serviceBill.downloadFile(res, bill_OUT)
            }
        });
    }else{
        paramsIvalids(res);
    }
}



module.exports ={
    getCategoriesByProvider,
	getProductsByCategory,
	createBill,
	getAllBill,
	getBillById,
	deleteBill,
	filterBill,
	downloadBill
};