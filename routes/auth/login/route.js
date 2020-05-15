let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
let empresaController = require('../../api/empresas/controller');
let EmpresaModel = require('../../api/empresas/model');

router.post('/signup', (req, res) => {

  const password = req.body.emp_pass;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    
    if(err) res.send(500).json({ 
      "estatus": 500,
      "mensaje": "Hubo un error al crear la empresa"
    });

    req.body.emp_pass = hash;

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

});

router.post('/login', (req, res) => {

  let { emp_numero, emp_pass } = req.body;

  EmpresaModel.findOne({emp_numero}).exec()
  .then(empresa => {
    if(!empresa) {
      res.status(404).json({
        "estatus": 404,
        "mensaje": `No se encontro empresa con numero ${emp_numero}`
      });

    } else {
      bcrypt.compare(emp_pass, empresa.emp_pass, (err, result) => {

        if(err) res.status(500).json({
          "estatus": 500,
          "mensaje": "Hubo un error al validar la contraseña"
        });
  
        if(result) {
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
      });
    }
  })
  .catch({
    "estatus": 500,
    "mensaje": "Hubo un error al buscar la empresa."
  });

});

module.exports = router;