const express = require('express');
const router = express.Router();
const empresaController = require('./controller');

/* 
	HTTP Metodos - /api/empresas
*/

// GET Obtener listado de empresas
router.get('/empresas', async (req, res) => {

	try {
		const empresas = await empresaController.getEmpresas();
		res.status(200).json({
			"estatus": 200,
			empresas: empresas
		});
	} catch(error) {

		console.log(error);

		res.status(500).json({
			"estatus": 500,
			mensaje: "Hubo un error al obtener las empresas"
		});
	}

});

// POST Crear empresa nueva
router.post('/empresas', async (req, res) => {

	try {
		req.body.emp_numero = await empresaController.getNumeroEmpresaNuevo();
	
		empresaController.crearEmpresa(req.body)
		.then(empresaCreada => {
				res.status(201).json({
					"estatus": 201,
					"mensaje": `Empresa creada exitosamente. No. Empresa ${empresaCreada.emp_numero}`
				});
			})
			.catch(err => {
	
				console.log(err);
	
				res.status(500).json({
					"estatus": 500,
					"mensaje": "Hubo un error al crear la empresa"
				});
			});

	} catch(e) {
		res.status(500).json({
			"estatus": 500,
			"mensaje": "Hubo un error al crear numero de empresa"
		});
	};

});

/* 
	HTTP Methods - /api/empresas/:numeroEmpresa
*/

// GET Obtener empresa por numero de empresa
router.get('/empresas/:numeroEmpresa', (req, res) => {

  let { numeroEmpresa } = req.params;

  empresaController.getEmpresa(numeroEmpresa)
		.then(empresa => {
			if(!empresa) {
				res.status(200).json({
					"estatus": 200,
					"mensaje": `No se encontro empresa con numero ${numeroEmpresa}`
				});

			} else {
				res.status(200).json({
					"estatus": 200,
					empresa: empresa
				});
			}
		})
		.catch({
			"estatus": 500,
			"mensaje": "Hubo un error al buscar la empresa."
		});

});

// DELETE Eliminar empresa por numero de empresa
router.delete('/empresas/:numeroEmpresa', (req, res) => {

	let { numeroEmpresa } = req.params;

  empresaController.borrarEmpresa(numeroEmpresa)
    // TODO: Respuesta en caso de error
		.then(result => {
			if(!result) res.status(200).json({ mensaje: 'Empresa no encontrada' });

			res.status(200).json({ 
				"estatus": 200,
				"mensaje": `Empresa con numero ${result.emp_numero} eliminada.`
			});
		})
		.catch(err => {
			res.status(500).json({
				"estatus": 500,
				"mensaje": "Hubo un error al eliminar la empresa"
			});
		});

});

// PUT Actualizar empresa por numero de empresa
router.put('/empresas/:numeroEmpresa', (req, res) => {
  
  let { numeroEmpresa } = req.params;

  let empresaActualizada = req.body;

	empresaController.actualizarEmpresa(numeroEmpresa, empresaActualizada)
		.then(result => {
			res.status(201).json({
				"estatus": 200,
        "mensaje": "Empresa actualizada con exito"
			});
    })
		.catch({
			"estatus": 500,
			"mensaje": "Hubo un error al actualizar la empresa"
		});

});

module.exports = router;
