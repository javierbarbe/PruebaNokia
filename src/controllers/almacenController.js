const modelos = require("../models");

// funcon para recuperar todos los almacenes a una variable
const getAlmacenes = 
    async (req, res) => {
        try {
          const hubs = await modelos.hubs.findAll();
          var arrayHubs = JSON.parse(JSON.stringify(hubs));
          res.render("almacenes/listaAlmacenes", {
            listaAlmacenes: arrayHubs,
          });
          res.status(200);
          //   return res.json(hubs);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "Something went wrong" });
        }
      
};

const deleteAlmacen =async (req, res) => {
    try{
    const idAlmacen = req.params.idAlmacen;
    const cantidad = await modelos.hubs.destroy({
      where: { id: idAlmacen },
    });
        // al ser un id unico... no tiene mucho sentido esta comprobación... si acaso hacer un find, comprobar que 
        // devuelve solo uno y ya despues realizar el destroy...
    console.log(cantidad, "debe seri igual a 1");
    if (cantidad == 1) {
      res.status(200).redirect("/listaAlmacenes");
    }
    }catch(error){
         console.log("ha habido un error", error);
      return res.status(500).json(error);
    }
  };

  const getEditAlmacen =async (req, res) => {
    try {
      const idAlmacen = req.params.idAlmacen;
  
      console.log("me han pasado id de alamacen", idAlmacen);
      const almacen = await modelos.hubs.findOne({
        where: { id: idAlmacen },
      });
      var alm = JSON.parse(JSON.stringify(almacen));
      console.log(alm, "el almacen cuya ide es" + idAlmacen);
        // renderizacion de la vista pasando el almacen como parámetro
      res.status(200).render("almacenes/Almacen", {
        almacen: alm,
      });
    } catch (error) {
     console.log("ha habido un error", error);
      return res.status(500).json(error);
    }
  };

  const postEditAlmacen=async (req, res) => {
    try {
      const idAlmacen = req.params.idAlmacen;
      console.log(idAlmacen);
      console.log(req.body.nombre);
      const modificado = await modelos.hubs.update(
        { nombre: req.body.nombre, localidad: req.body.localidad },
        {
          where: {
            id: idAlmacen,
          },
        }
      );
      console.log(modificado, "el modificado");
        // redireccion a peticion GET ya carga todo ahi
      res.status(200).redirect("/listaAlmacenes");
    } catch (error) {
     console.log("ha habido un error", error);
      return res.status(500).json(error);
    }
  };

  const getCrearAlmacen= (req, res) => {
    res.status(200).render("almacenes/nuevoAlmacen");
  }

  const postCrearAlmacen=async (req, res) => {
    try {
      const { nombre, localidad } = req.body;
      const almacen = await modelos.hubs.create({ nombre, localidad });
      console.log(almacen);
        // redireccion a peticion GET ya carga todo ahi
      return res.redirect("/listaAlmacenes");
    } catch (error) {
      console.log("ha habido un error", error);
      return res.status(500).json(error);
    }
  }
module.exports={
    getAlmacenes,
    deleteAlmacen,
    getEditAlmacen,
    postEditAlmacen,
    getCrearAlmacen,
    postCrearAlmacen
}
