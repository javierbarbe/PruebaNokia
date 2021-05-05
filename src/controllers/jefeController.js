const modelos = require("../models");

const cargaHubs= async()=>{
    const hubs = await modelos.hubs.findAll();
    var arrayAlmacenes = JSON.parse(JSON.stringify(hubs));
    return arrayAlmacenes;
}

const getAddEncargado=  async (req, res) => {
    try {
        var almacenes =await  cargaHubs();
        res.render("auth/addEncargado", {
          arrayAlmacenes: almacenes,
        });
    } catch (error) {
      console.log('errores al ver la vista addEncargado',error);
    }
  };

  const postAddEncargado =async (req, res) => {
    try {
      const { nombre, hubId } = req.body;
      const jefe = await modelos.jefes.create({ nombre, hubId });
      console.log(jefe);
      res.status(200).redirect('/listarEncargados');
    } catch (error) {
      var errores =[];
      console.log("ha habido un error", error.errors);
      Array.from(error.errors,(mistake)=>{
        if(mistake.message=='hubId must be unique') errores.push('el almacen elegido ya tiene jefe');
        else errores.push(mistake.message);
      });
      var almacenes =await  cargaHubs();
      res.render('auth/addEncargado',{
        errores:errores,
        arrayAlmacenes:almacenes
      })
    }
  };

  const deleteEncargado =async (req, res) => {


      
    try {
      const idEncargado = req.params.idEncargado;
      console.log("el idEncargado pasado por paramETRP", idEncargado);
      await modelos.jefes.destroy({
        where: { id: idEncargado },
      });
      res.status(200).redirect('/listarEncargados');
    
    } catch (err) {
      console.log("ha habifo un error eliminando el ENCARGADO");
      console.log(err);
      return res.status(500).json(err);
    }
  };

  const getEditarEncargado = async (req, res) => {
    try {
      const idEncargado = req.params.idEncargado;

      console.log("me han pasado id de ENCARGADO", idEncargado);
      const encargado = await modelos.jefes.findOne({
        where: { id: idEncargado },
      });
      var enca = JSON.parse(JSON.stringify(encargado));
      console.log(enca, "el almacen cuya ide es" + idEncargado);
      const hubs= await cargaHubs();
      res.status(200).render("auth/Encargado", {
        encargado: enca,
        almacenes:hubs
      });
    } catch (error) {
        console.log(error);
    }
  };

  const postEditEncargado = async (req, res) => {
    const idEncargado = req.params.idEncargado;

    try {
      console.log(idEncargado);
      console.log(req.body.nombre);
      const hubId = req.body.hubId;
      const nombre = req.body.nombre;
      console.log('el hubid:',hubId) ;
      // if(hubId.length>0){
        const modificado = await modelos.jefes.update(
          { nombre: nombre, hubId: hubId },
          {
            where: {
              id: idEncargado,
            },
          }
        );
      res.status(200).redirect("/listarEncargados");
    } catch (error) {
      var listaErrores = [];
      if(error.errors){
        Array.from(error.errors,(error)=>{
          console.log("un error dentro del array", error.message);
          if(error.message=='hubId must be unique'){
            listaErrores.push('Ese almacen ya esta relacionado con otro encargado/jefe');
          }else listaErrores.push(error.message);
        });
        console.log( error.errors[0].message);
      
      }
      console.log("ha habido un error al modiicar");
      console.log(error);
      const encargado = await modelos.jefes.findOne({
        where: { id: idEncargado },
      });
      var enca = JSON.parse(JSON.stringify(encargado));
      console.log(enca, "el almacen cuya ide es" + idEncargado);
      const hubs= await cargaHubs();
      res.render(`auth/Encargado` ,{
        errores:listaErrores,
        encargado:enca,
        almacenes:hubs
      })
    }
  };
  const getConsultaEncargado=async (req,res)=>{
    try {
    const listaEncargados = await modelos.jefes.findAll();
    var jefes = JSON.parse(JSON.stringify(listaEncargados));
    res.render('auth/consultaResponsable',{
      encargados:jefes
    });
      
    } catch (error) {
      console.log('errores al cargar la lista de encargados en la consulta por su id',error);
    }
  };

  const postConsultaEncargado =async (req,res)=>{
    try {
      const idEncargado = req.body.idEncargado;
      const todo = await modelos.jefes.findAll({include:[{model:modelos.hubs, as :'almacen'}], where:{ id:idEncargado}});
      const todo2= JSON.parse(JSON.stringify(todo));
      console.log('todo TOOOOOOOOOOOOOODO', todo2[0]);
      console.log("el id del almacen", todo2[0].almacen.id);
      console.log("========================================\n==============================\n===============");
      const todosProd= JSON.parse(JSON.stringify(
        await modelos.productos.findAll({include:[{model:modelos.hubs, as: 'hub' }], where:{hubId: todo2[0].almacen.id}})
        ));
    
        console.log('todos los prods',todosProd);
      
      console.log(idEncargado);
      res.status(200).render('auth/vistaConsulta',{
        encargado_almacen:todo2[0],
        articulos_almacen:todosProd
      });
    
    } catch (error) {

      console.log('error',error);
      var paco='paco';
      res.status(500).render('auth/consultaResponsable',{
        error:error
      });
    }
    

  };
  const listarEncargados =async (req, res) => {
    try {
      const encargados =await modelos.jefes.findAll();
      var arrayEncargados = JSON.parse(JSON.stringify(encargados));
      res.status(200).render('auth/listaEncargados',{
        encargados:arrayEncargados
      });
    } catch (error) {
      console.log('error listando los encargados',error);
      res.status(500);
    }
   
  };

  module.exports= {
getAddEncargado,
postAddEncargado,
deleteEncargado,
getEditarEncargado,
postEditEncargado,
getConsultaEncargado,
postConsultaEncargado,
listarEncargados
  }