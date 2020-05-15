const EmpresaModel = require('../routes/api/empresas/model');
const EstatusDispersionesModel = require('../routes/api/dispersiones/status.model');
const DispersionesModel = require('../routes/api/dispersiones/model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const estatus1 = new EstatusDispersionesModel({
  sts_id: 1,
  sts_descripcion: 'Lote Enviado'
});
const estatus2 = new EstatusDispersionesModel({
  sts_id: 2,
  sts_descripcion: 'Lote Aplicado'
});
const estatus3 = new EstatusDispersionesModel({
  sts_id: 3,
  sts_descripcion: 'Lote Rechazado'
});
const estatus4 = new EstatusDispersionesModel({
  sts_id: 4,
  sts_descripcion: 'Lote Cancelado'
});

const estatus5 = new EstatusDispersionesModel({
  sts_id: 5,
  sts_descripcion: 'Lote Pediente'
});

async function dropDB() {
  try {
    await EmpresaModel.deleteMany();
    await DispersionesModel.deleteMany();
    await EstatusDispersionesModel.deleteMany();
  } catch(e) {
    console.log("Hubo un error al reiniciar la base de datos");
    console.log(e);
  }
}

async function inicioBD() {
  try {
    let pass1 = await generarPassword("12345678")
    let pass2 = await generarPassword("abcdefgh")
    let pass3 = await generarPassword("abcd1234")
    let pass4 = await generarPassword("1234abcd")
    let pass5 = await generarPassword("efgh1234")
    
    const empresa1 = new EmpresaModel({
      emp_numero: "4200000100",
      emp_nombre: "FANTASIAS MIGUEL S A C V",
      emp_pass: pass1
    });
    const empresa2 = new EmpresaModel({
      emp_numero: "4200000101",
      emp_nombre: "NUEVA ICACOS SA DE CV(H.A.R)",
      emp_pass: pass2
    });
    const empresa3 = new EmpresaModel({
      emp_numero: "4200000102",
      emp_nombre: "RESTAURANT BAR LA MANSION S A DE C V",
      emp_pass: pass3
    });
    const empresa4 = new EmpresaModel({
      emp_numero: "4200000103",
      emp_nombre: "OPERADORA FLORIAN SA CV",
      emp_pass: pass4
    });
    const empresa5 = new EmpresaModel({
      emp_numero: "4200000104",
      emp_nombre: "EDUCACION Y CULTURA DEL NORTE A.C.",
      emp_pass: pass5
    });
    await empresa1.save();
    await empresa2.save();
    await empresa3.save();
    await empresa4.save();
    await empresa5.save();
    await estatus1.save();
    await estatus2.save();
    await estatus3.save();
    await estatus4.save();
    await estatus5.save();
  } catch(e) {
    console.log("Hubo un error al iniciar la base de datos");
    console.log(e);
  }
}

async function generarPassword(pass) {
  let passGen = await bcrypt.hash(pass, saltRounds);

  return passGen;
}

module.exports = {
  dropDB,
  inicioBD
};