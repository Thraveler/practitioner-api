const express = require('express');
const router = express.Router();
const dipersionController = require('./controller');

/* 
	HTTP Metodos - /api/dispersiones
*/

// GET Obtener listado de dispersiones
router.get('/dispersiones', (req, res) => {
	
	dipersionController.getDispersiones()
		.then(dispersiones => {
			res.status(200).json({
				"estatus": 200,
				"dispersiones": dispersiones
			});
    })
		.catch(err => {
			console.log(err);

			res.status(500).json({
				"estatus": 500,
				"mensaje": "Hubo un error al obtener las dispersiones"
			});
		});

});

// POST Crear dispersion nuenva
router.post('/dispersiones', (req, res) => {

	dipersionController.crearDispersion(req.body)
	.then(dispersionCreada => {
			res.status(201).json({
				"estatus": 201,
				"mensaje": "Dispersion creada con éxito"
			});
		})
		.catch(err => {

			console.log(err);

			res.status(500).json({
				"estatus": 500,
				"mensaje": "Hubo un error al crear la dispersión"
			});
		});

});

/* 
	HTTP Methods - /api/dispersion/:numeroLote
*/

// GET Obtener dispersion por numero de lote
router.get('/dispersiones/:numeroLote', (req, res) => {

  let { numeroLote } = req.params;

  dipersionController.getDispersion(numeroLote)
    // TODO: Evaluar respuesta por si es vacia
		.then(dispersion => {
			res.status(200).json(dispersion);
		})
		.catch();

});

// DELETE Eliminar dispersion por numero de lote
router.delete('/dispersiones/:numeroLote', (req, res) => {

	console.log(req.body.id_emp)

	let query = {
		dsi_lote: req.params.numeroLote,
		dsi_emp: req.body.id_emp
	};

  dipersionController.borrarDispersion(query)
		.then(result => {
			if(!result) {
        res.status(200).json({ 
					"estatus": 404,
					mensaje: 'Dispersion no encontrada' 
				});
      } else {
        res.status(200).json({ 
					estatus: 201,
					mensaje: `Dispersion con numero de lote ${result.dsi_lote} cancelada.`
				});
      }
      
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});

});

// PUT Actualizar dispersion por numero de lote
router.put('/dispersiones/:numeroLote', (req, res) => {
  
  let { numeroLote } = req.params;

  let dispersionActualizada = req.body;

	dipersionController.actualizarDispersion(numeroLote, dispersionActualizada)
		.then(result => {
      // TODO: Evaluar resultado por si no se ejecuto cambio
			res.status(201).json({
        message: "Datos actualizados",
				code: 200
			});
    })
		.catch(e => {
			console.log(e);

			res.status(500).json({
				"estatus": 500,
				"mensaje": "Hubo un error al actualizar el usuario"
			});
		});

});

/* 
	HTTP Methods - /api/dispersion/:numeroLote
*/

// GET Obtener listado de dispersiones de una empresa
router.get('/dispersiones/empresa/:idEmpresa', (req, res) => {
	
	let query = { dsi_emp: req.params.idEmpresa }

	dipersionController.getDispersiones(query)
		.then(dispersiones => {
			if(dispersiones.length == 0) {
				res.status(200).json({
					"estatus": 200,
					"mensaje": "No hay dispersiones"
				});
			} else {
				res.status(200).json({
					"estatus": 200,
					"dispersiones": dispersiones
			});}
    })
		.catch(err => {
			console.log(err);

			res.status(500).json({
				"estatus": 500,
				"mensaje": "Hubo un error al obtener las dispersiones"
			});
		});

});

module.exports = router;