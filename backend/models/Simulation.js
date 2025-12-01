// models/Simulation.js
const mongoose = require('mongoose');

const EvaluacionSimuladaSchema = new mongoose.Schema({
  nombre: String,
  peso: Number,
  nota: Number
});

const SimulacionSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  evaluaciones: [EvaluacionSimuladaSchema],
  promedioSimulado: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Simulation', SimulacionSchema);
