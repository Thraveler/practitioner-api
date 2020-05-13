const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estatusDispersionSchema = new Schema({
  sts_id: {
    type: Number,
    require: true,
    unique: true
  },
  sts_descripcion: String
});


module.exports = mongoose.model('EstatusDispersion', estatusDispersionSchema);