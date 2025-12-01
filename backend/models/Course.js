// models/Course.js
const mongoose = require('mongoose');

const EvaluacionSchema = new mongoose.Schema({
  nombre: String,
  peso: Number
});

const CourseSchema = new mongoose.Schema({
  codigo: String,
  nombre: String,
  evaluaciones: [EvaluacionSchema]
});

module.exports = mongoose.model('Course', CourseSchema);
