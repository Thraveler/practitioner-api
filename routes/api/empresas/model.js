const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  emp_numero: {
    type: String,
    require: true,
    unique: true,
    match: /42[0-9]{8}/
  },
  emp_nombre: {
    type: String,
    require: true,
    unique: true,
    match: /^[A-Z0-9\s!@#\$%\^\&*\)\(+=._-]/
  },
  emp_pass: {
    type: String,
    require: true
  },
  emp_alta: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Empresa', empresaSchema);