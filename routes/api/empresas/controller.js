
const EmpresaModel = require('./model');

function getEmpresas() {
  return EmpresaModel
    .find()
    .select(
      'emp_numero emp_nombre emp_alta'
    )
    .exec();
}

function crearEmpresa(empresaRecibida) {
  
  const empresa = new EmpresaModel({
    emp_numero: empresaRecibida.emp_numero,
    emp_nombre: empresaRecibida.emp_nombre,
    emp_pass: empresaRecibida.emp_pass
  });

  return empresa.save();

}

function getEmpresa(numeroEmpresa) {
  return EmpresaModel
    .findOne({ emp_numero: numeroEmpresa})
    .select(
      'emp_numero emp_nombre emp_alta'
    )
    .exec();
}

function borrarEmpresa(numeroEmpresa) {
  return EmpresaModel.findOneAndRemove({ emp_numero: numeroEmpresa}).exec();
}

function actualizarEmpresa(numeroEmpresa, empresaActualizada) {
  return EmpresaModel.findOneAndUpdate({ emp_numero: numeroEmpresa}, empresaActualizada).exec();
}

async function getNumeroEmpresaNuevo() {
  try {
    let empresas = await EmpresaModel.find().select('emp_numero').exec();
    const l = empresas.length;
    
    if(l > 0) {
      const noEmpresaNuevo = (parseInt(empresas[l - 1].emp_numero) + 1).toString();

      return noEmpresaNuevo;
    }
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  getEmpresas,
  crearEmpresa,
  getEmpresa,
  borrarEmpresa,
  actualizarEmpresa,
  getNumeroEmpresaNuevo
};