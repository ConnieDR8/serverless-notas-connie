// models/Nota.js
const mongoose = require('mongoose');

const EvaluacionSchema = new mongoose.Schema({
  nombre: String,
  peso: Number,
  nota: Number // puede ser null
});

const NotaSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  evaluaciones: [EvaluacionSchema]
});

module.exports = mongoose.model('Nota', NotaSchema);
