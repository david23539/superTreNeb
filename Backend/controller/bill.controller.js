'use strict';

const constantFile = require('../utils/Constant');
const validationGlobal = require('../Validation/global.validation');
const ProviderModel = require('../model/provider.model');
const auditoriaController = require('./saveLogs.controller');
const CategoriesModel = require('../model/category.model');
const categoryAdapter = require('../adapter/category.adapter');


let max = 0;

function getCategoriesByProvider(req, res){
    let params_IN = req.params.idProvider;
    if(validationGlobal.validateId(params_IN)){
       ProviderModel.findById(params_IN, (err, provider_OUT)=>{
           if(err){
               auditoriaController.saveLogsData(req.user.name,err, req.connection.remoteAddress, 'getCategoryByProvider');
               res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR})
           }else if(!provider_OUT){
               res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_CATEGORY_AVAIBLE})
           }else{
                privatePrepareCategories(provider_OUT.stn_categoryFk, res)
           }
       })
    }else{
        paramsIvalids(res)

    }

}

function privatePrepareCategories(categoriesId_IN, res){
    max = categoriesId_IN.length;
    let dataCategories = [];
    for(let item of categoriesId_IN){
        CategoriesModel.findById(item, (err, category_OUT)=>{
            if(err || !category_OUT){
                privateReturnErrorList(res);
                break;
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
    res.status(constantFile.httpCode.PETITION_CORRECT).send({categories: categoryAdapter.getAllCategoriesAdapter(categories_IN)})

}


function privateReturnErrorList(res){
    res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.CATEGORY_GET_CATEGORY_ERROR})
}

function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

module.exports ={
    getCategoriesByProvider
};