// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  codigo: String,
  nombre: String,
  email: String
});

module.exports = mongoose.model('Student', StudentSchema);
