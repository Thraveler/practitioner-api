
const DispersionModel = require('./model');
const EstatusDispersionModel = require('./status.model');

function getDispersiones(query) {

  return DispersionModel
    .find(query)
    .populate('dsi_emp', 'emp_numero')
    .populate('dsi_status', 'sts_descripcion')
    .select(
      'emp_numero dsi_lote dsi_fecha dsi_num_oper dsi_imp_lote dsi_fecha sts_descripcion'
    )
    .exec();
}

async function crearDispersion(dispersionRecibida) {
  
  try {
    let statusDispersion = await getEstatusDispersion(1);
    let noLoteNuevo = await getNumeroLoteNuevo();

    const dispersion = new DispersionModel({
      dsi_emp: dispersionRecibida.dsi_emp,
      dsi_lote: noLoteNuevo,
      dsi_num_oper: dispersionRecibida.dsi_num_oper,
      dsi_imp_lote: dispersionRecibida.dsi_imp_lote,
      dsi_status: statusDispersion._id
    });
  
    return dispersion.save();
    
  } catch (error) {
    
  }

}

function getDispersion(numeroLote) {
  return DispersionModel
    .findOne({ dsi_lote: numeroLote})
    .populate('dsi_emp', 'emp_numero')
    .populate('dsi_status', 'sts_descripcion')
    .select(
      'emp_numero dsi_lote dsi_fecha dsi_num_oper dsi_imp_lote dsi_fecha sts_descripcion'
    )
    .exec();
}

async function borrarDispersion(query) {
  try {
    let statusDispersion = await getEstatusDispersion(4);

    return DispersionModel.findOneAndUpdate(query, {dsi_status: statusDispersion._id}).exec();
  } catch(error) {
    console.log(error);
  }
}

function actualizarDispersion(numeroLote, dispersionActualizada) {
  return DispersionModel.findOneAndUpdate({ dsi_lote: numeroLote}, dispersionActualizada).exec();
}

function getEstatusDispersion(idStatus) {
  return EstatusDispersionModel.findOne({sts_id: idStatus}).exec();
}

async function getNumeroLoteNuevo() {
  try {
    let dispersiones = await DispersionModel.find().select('dsi_lote').exec();
    const l = dispersiones.length;
    
    if(l > 0) {
      const noLoteNuevo = dispersiones[l - 1].dsi_lote + 1;

      return noLoteNuevo;
    } else {
      return 1;
    }
  } catch(e) {
    console.log(e);
  }
}


module.exports = {
  getDispersiones,
  crearDispersion,
  getDispersion,
  borrarDispersion,
  actualizarDispersion
};