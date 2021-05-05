// const { response } = require("express");
const express = require("express");
// const  Swal  = require("sweetalert2");
// const { ValidationErrorItem } = require("sequelize/types");
const router = express.Router();
// const conexion = require("../../connection");
// const { route } = require("../../routing/rutasServicioRESTFULL/routeRest");
const modelos = require("../models");
const almacenController = require('../controllers/almacenController');
const jefeController = require('../controllers/jefeController');
const articuloController = require('../controllers/articuloController');
const cargaHubs= async()=>{
    const hubs = await modelos.hubs.findAll();
    var arrayAlmacenes = JSON.parse(JSON.stringify(hubs));
    return arrayAlmacenes;
}
router.get('/',(req,res)=>{
    res.render('index/index');
})
//#region ********************************************** almacenes ***********************************
router.get("/listaAlmacenes", almacenController.getAlmacenes);
router.get("/deleteAlmacen/:idAlmacen",  almacenController.deleteAlmacen);
router.route("/editAlmacen/:idAlmacen").get(almacenController.getEditAlmacen)
                                        .post(almacenController.postEditAlmacen);
router.route("/crearAlmacen").get(almacenController.getCrearAlmacen)
                            .post(almacenController.postCrearAlmacen);
//#endregion
//#region  ********************************************encargados --jefes *************************************************************
//#region  crear encargados
    router.get("/addEncargado", jefeController.getAddEncargado);

    router.post("/creaEncargado", jefeController.postAddEncargado);
//#endregion
//#region eliminar Encargados
    router.get("/deleteEncargado/:idEncargado", jefeController.deleteEncargado);
//#endregion
//#region editar Encargados
router.route("/editEncargado/:idEncargado").post(jefeController.postEditEncargado)
                                            .get(jefeController.getEditarEncargado);
   
//#endregion
//#region listar Encargados
router.get("/listarEncargados",jefeController.listarEncargados);

router.route('/consultaEncargado').get(jefeController.getConsultaEncargado).post(jefeController.postConsultaEncargado);


//#endregion
//#endregion
//#region ******************************************productos**************************
    router.get('/listaProductos',articuloController.listaProductos)
    //#region crear productos
    router.route('/addProducto').get(articuloController.getAddProducto).post(articuloController.postAddProducto);
    //#endregion
    //#region editar productos
    router.get('/editProducto/:idProducto/:idAlmacen', articuloController.getEditProducto);

    router.post('/editProducto',articuloController.postEditProducto);
    //#endregion
    //#region eliminar productos
    router.get('/deleteProducto/:idProducto/:hubId', articuloController.deleteProducto);
    //#endregion
//#endregion
// router.post("/encargados", async (req, res) => {
//   console.log("la url deberia ser encargados/...", req.body.opcion);
// });



module.exports = router;
