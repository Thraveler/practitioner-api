const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EstatusDispersionModel = require('./status.model');

const dispersionSchema = new Schema({
  dsi_emp: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa'
  },
  dsi_lote: {
    type: Number,
    require: true,
    unique: true,
    max: 999999
  },
  dsi_fecha: {
    type: Date,
    default: new Date().toLocaleDateString()
  },
  dsi_num_oper: {
    type: Number,
    require: true
  },
  dsi_imp_lote: {
    type: Number,
    require: true
  },
  dsi_status: {
    type: Schema.Types.ObjectId,
    ref: 'EstatusDispersion',
    required: true
  },
});

module.exports = mongoose.model('Dispersion', dispersionSchema);