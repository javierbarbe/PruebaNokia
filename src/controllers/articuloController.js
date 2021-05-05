
const modelos = require("../models");
const cargaHubs= async()=>{
    const hubs = await modelos.hubs.findAll();
    var arrayAlmacenes = JSON.parse(JSON.stringify(hubs));
    return arrayAlmacenes;
}
const listaProductos = async(req,res)=>{
    try {
      const arrayProductos = await modelos.productos.findAll();
    var listaProductos = JSON.parse(JSON.stringify(arrayProductos));
    console.log('array de productos',listaProductos);
    res.render('productos/listaProductos',{
        listaProductos : listaProductos
    })
    } catch (error) {
      console.log('error listando los productos', error);
      res.status(500);
    }
    
  };

  const getAddProducto =async(req,res)=>{
    try {
      const hubs= await cargaHubs();
      res.render('productos/creaProducto',{
        almacenes: hubs
      });
    } catch (error) {
      console.log('error al getAddproduccto',error);
         res.status(500);
    }
  };

  const postAddProducto= async(req,res)=>{
    const {nombre, precio, hubId, id,cantidad} = req.body;
    try {
      const producto = await modelos.productos.create({nombre,precio,hubId, id,cantidad});
      res.status(200).redirect('listaProductos');
    } catch (error) {
      console.log('error al añadir producto',error);
      var errores= [];
      Array.from(error.errors, (mistake)=>{
          console.log('el mensaje del mistake',mistake.message);
          if(mistake.message=='PRIMARY must be unique')
            errores.push('Errores en primary key, recuerde que es conjunta y está formada por los campos Id y almacen');
          else errores.push(mistake.message);
      });
      const hubs = await cargaHubs();
      res.status(500).render('productos/creaProducto',{
          errores: errores,
          almacenes: hubs

      });
    }
  };
const getEditProducto =   async (req,res)=>{
    try {
        const idProducto = req.params.idProducto;
        const idAlmacen = req.params.idAlmacen;
        const producto = await modelos.productos.findOne({
          where: { hubId: idAlmacen, id:idProducto },
        });
        var prod = JSON.parse(JSON.stringify(producto));
        
        const hubs= await cargaHubs();
        res.render('productos/Producto',{
          producto:prod,
          almacenes:hubs
        })
    } catch (error) {
        console.log('error en getEditProdcuto',error);
        res.status(500);
    }
 
  };

  const postEditProducto =async(req,res)=>{
    try {
      console.log("en postEdit Producto");
      const {nombre, precio, cantidad,hubId,id, hubPrevio} =req.body;
      const modificado = await modelos.productos.update(
        { nombre: nombre, precio: precio, hubId:hubId, id:id,cantidad: cantidad},
        {
          where: {
            id: id,
            hubId:hubPrevio
          },
        }
      );
      res.status(200).redirect('/listaProductos');
    } catch (error) {
      console.log('errores acutalizando el producto', error);
      res.status(500);
    }
        };

const deleteProducto =   async(req,res)=>{
    console.log("he pulsado en delete producto");
    const idProducto= req.params.idProducto;
    const hubId= req.params.hubId;
    try {
      const eliminado = await modelos.productos.destroy({
        where: { id: idProducto, hubId:hubId },
      });
      res.redirect('/listaProductos');
    } catch (error) {
      console.log('errores al eliminar producto', error);
      res.status(500);
    }
  };
  module.exports={
      listaProductos,
      getAddProducto,
      postAddProducto,
      getEditProducto,
      postEditProducto,
      deleteProducto
  }
