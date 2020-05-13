let express = require('express');
let router = express.Router();
let empresaController = require('../../api/empresas/controller');
let EmpresaModel = require('../../api/empresas/model');

router.post('/signup', async (req, res) => {
  
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

router.post('/login', (req, res) => {

  let { emp_numero, emp_pass } = req.body;

  console.log(req.body);

  EmpresaModel.findOne({emp_numero}).exec()
  .then(empresa => {
    console.log(empresa);
    console.log(emp_pass);
    if(!empresa) {
      res.status(404).json({
        "estatus": 404,
        "mensaje": `No se encontro empresa con numero ${emp_numero}`
      });

    } else {
      if(empresa.emp_pass === emp_pass) {
        res.status(200).json({
          "estatus": 200,
          "mensaje": "Logeo exitoso",
          empresa: {
            emp_numero: empresa.emp_numero,
            id_emp: empresa._id
          }
        });
      } else {
        res.status(404).json({
          "estatus": 404,
          "mensaje": `Contraseña invalida`
        });
      }
    }
  })
  .catch({
    "estatus": 500,
    "mensaje": "Hubo un error al buscar la empresa."
  });

});

module.exports = router;