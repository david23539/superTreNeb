/* eslint-disable indent */
'use strict';

const NotificationModel = require('../model/notification.model');
const constantFile = require('../utils/Constant');
const AdapterNotification = require('../adapter/notification.adapter');
const ProductModel = require('../model/product.model');
const adapterProduct = require('../adapter/product.adapter');




/**
 *
 * @param class_IN parametro que indica de que tipo es la notificacion
 * @param idItem el id del producto de momento
 * @param more indica si en el bucle en el producto aun queda algun producto por enviar a este metodo
 * @param res la respuesta a cliente
 */
function addNotification (class_IN, idItem, more, res){
    let notification_IN = AdapterNotification.adapterNotification_IN(class_IN,idItem);
    findSingleNotification(class_IN, idItem, (err, notification_OUT)=>{
        if(notification_OUT.length === 0){
           notification_IN.save((err, notification_OUT)=>{
               if(err || !notification_OUT){
                   res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
               }else if(notification_OUT){
                   if(!more){
                       getNotifications(res);
                   }
               }
           });
        }
    });
}

function findSingleNotification(class_IN, idItem, cb){
    NotificationModel.find({stn_class:class_IN, stn_item:idItem}, cb);
}

function checkNotifications(req,res){
	getNotifications(res);
}


function getNotifications(res){
    NotificationModel.find().exec((err, notificatonsList_OUT)=>{
        if(err){
            res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
        }else if(notificatonsList_OUT.length === 0){
            res.status(constantFile.httpCode.PETITION_CORRECT).send({notification: 0});
        }else{
            let resultNotifications = getCompleteData(notificatonsList_OUT);
            if(resultNotifications.product.length > 0){
				transformDataProductNotifications(res, resultNotifications.product);
            }else{//aqui habra que añadir mas if si abarcamos mas tipos de notiifcaciones
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
            }
        }
    });
}

/**
 * Esta funcion recoge el id del item modificado
 * lo busca en la coleccion de notificaciones y si
 * encuentra el id lo elimina y devuelve todas las notificaciones
 * si no lo encuentra devuelve las notificaciones
 * @param id del item
 * @param res respuesta
 */

function notificationbyIdItem(id,res){
	NotificationModel.findOne({stn_item:id},(err, notification_OUT)=>{
		if(err){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
		}else if(notification_OUT){
			deletedNotification(notification_OUT._doc.stn_item, (err, deletedItem_OUT)=>{
				if(err || !deletedItem_OUT){
					res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
				}else{
					getNotifications(res);
				}
			});
		}else{
			getNotifications(res);
		}
	});

}

function deletedNotification(id, cb){
	NotificationModel.findOneAndRemove({stn_item:id},cb);
}



/**
 *
 * @param res respuesta a cliente
 * @param productListIds Array de Ids de productos
 * @function funcion necesaria del producto ya que no podemos volver al controller del producto por perdida de instancia
 */
function transformDataProductNotifications(res, productListIds){
	ProductModel.find()
        .where('_id')
        .in(productListIds)
        .exec((err, productsListOut)=>{
		if(err){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR});
		}else if(productsListOut.length === 0){
			res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.PRODUCT_GET_ERROR});
		}else{
			res.status(constantFile.httpCode.PETITION_CORRECT).send({products: adapterProduct.AdapListProdWithoutCat_OUT(productsListOut)});
		}
	});
}

function getCompleteData(notificationList_IN){
    let listProducts = [];
    let result = {
        product:listProducts

    };
    for(let item of notificationList_IN){
        if(item._doc.stn_class === 'Product'){
            listProducts.push(item._doc.stn_item);
        }
    }
    return result;
}



module.exports ={
    addNotification,
	getNotifications,
	checkNotifications,
	notificationbyIdItem


};