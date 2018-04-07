export const CONSTANT = {
  keysPress:{
    MULTIPLICATION : "*",
    SUM: "+",
    REST: "-",
    DELETEITEM:"Backspace",
    COMA:".",
    ENTER: "Enter"

  },
  OperationTables:{
    create:"create",
    update:"update",
    delete:"delete"
  },
  ResponseServers:{
    Category_Success:"Se ha creado la categoria con exito",
    Category_Success_Update:"Se ha actualizado correctamente la categoria",
    Category_Success_Deleted:"La categoria se ha eliminado",
    InvalidParams:"Los parametros de entrada no son correctos",
    Category_Error:"Algo a ido mal con la categoría",
    No_Data_Category: "No hay coincidencias",
    No_Data_Avaible:'No existen categorías'
  },
  Styles:{
    Valid:"valid pink-text",
    Invalid:"invalid pink-text",
    Error: 'red accent-2',
    Success: 'teal lighten-1',
    Warning: 'orange lighten-1'
  },
  Labels:{
    AddCategory:"Añadir Categorías",
    DeleteCategory:"Eliminar Categoría",
    ModifyCategory: "Modificar Categorías",
    Category:"Nombre Categoria",
    Description: "Descripción",
    Iva:"IVA",
    Cost:"Coste",
    Margin: "Margen",
    Ref:"Referencia",
    Stock:"Stock",
    Save:"Guardar",
    Yes: "Si",
    No: "No",
    Update:"Actualizar",
    Cancel:"Cancelar",
    Delete: "Eliminar",
    Control_Input_Required: "El campo debe estar informado",
    Confirm_Deleted_Category: "¿Estas seguro que quieres eliminar la categoría?",
    ProductTitle: "Productos",
    SearchProducts: "Buscar Productos",
    AddProduct: "Añadir Productos",
    Name: "Nombre",
    QuestionImage: "¿Desea añadir una imagen al producto creado?",
    TooltipNameProduct: "Nombre del producto",
    TooltipDesProduct: "Descripción del producto",
    TooltipCostProduct: "Coste del producto",
    TooltipRefProduct: "Referencia del producto",
    TooltipMarginProduct: "Margen del producto",
    TooltipStockProduct: "Stock del producto",
    TooltipIvaProduct: "Iva del producto"

  },
  headCategory:["Nombre", "Descripción", "IVA"],
  headProduct:["Nombre", "Descripción", "Coste", "Referencia", "Iva", "Margen", "Stock","Categoría", "Imagen"],

  messageToast:{
    NOSELECTEDITEM: "Debe seleccional un elemento antes de hacer algun cambio",
    CATEGORY_NEW_SUCCESS: "Se ha creado con exito la categoría",
    PRODUCT_NEW_SUCCESS: "Se ha creado con exito el producto",
    CATEGORY_ERROR: "Ha ocurrido un error con la categoría",
    PRODUCT_ERROR: "Ha ocurrido un error con el producto",
    CATEGORY_UPDATE_SUCCESS: "Se ha actualizado con exito la categoría",
    PRODUCT_UPDATE_SUCCESS: "Se ha actualizado con exito el producto",
    CATEGORY_DELETED_SUCCESS: "Se ha eliminado con exito la categoría",
    NO_DATA_CATEGORY:"No hay datos coincidentes",
    NO_CATEGORY_DATA:"No hay creadas categorías todavía"
  }
};
