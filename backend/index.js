// index.js
const express = require('express');
const app = express();
const connectDB = require('./lib/db');
connectDB();
app.use(express.json());

// Modelos
const Student = require('./models/student');
const Course = require('./models/Course');
const Registration = require('./models/Registration');
const Nota = require('./models/Nota');
const Simulation = require('./models/Simulation');

// =========================
// ENDPOINTS
// =========================

// Ver todos los cursos de un alumno
app.get('/api/courses/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const regs = await Registration.find({ student_id: studentId }).populate('course_id');
    const cursos = regs.map(r => r.course_id);
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver notas de un curso específico
app.get('/api/grades/:studentId/:courseId', async (req, res) => {
  const { studentId, courseId } = req.params;
  try {
    const notaDoc = await Nota.findOne({ student_id: studentId, course_id: courseId });
    res.json(notaDoc ? notaDoc.evaluaciones : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calcular promedio actual
app.post('/api/calculateAverage', (req, res) => {
  const { evaluaciones } = req.body;
  
  if (!evaluaciones || evaluaciones.length === 0) {
    return res.status(400).json({ error: 'No hay evaluaciones' });
  }

  const suma = evaluaciones.reduce((acc, ev) => acc + (ev.nota || 0) * ev.peso, 0);
  const total = evaluaciones.reduce((acc, ev) => acc + ev.peso, 0);

  res.json({ promedio: total > 0 ? suma / total : 0 });
});

// Calcular nota requerida para aprobar
app.post('/api/calculateRequiredGrade', (req, res) => {
  const { evaluaciones, notaAprobatoria = 10.5 } = req.body;

  const sumaActual = evaluaciones
    .filter(ev => ev.nota !== null)
    .reduce((acc, ev) => acc + ev.nota * ev.peso, 0);

  const pesoTotal = evaluaciones.reduce((acc, ev) => acc + ev.peso, 0);
  const pesoFaltante = evaluaciones
    .filter(ev => ev.nota === null)
    .reduce((acc, ev) => acc + ev.peso, 0);

  const notaFaltante = (notaAprobatoria * pesoTotal - sumaActual) / pesoFaltante;

  res.json({ 
    notaFaltante: notaFaltante.toFixed(2),
    esAlcanzable: notaFaltante <= 20 
  });
});

// Guardar simulación
app.post('/api/saveSimulation', async (req, res) => {
  const { student_id, course_id, evaluaciones, promedioSimulado } = req.body;
  try {
    const simulacion = new Simulation({ student_id, course_id, evaluaciones, promedioSimulado });
    await simulacion.save();
    res.json({ ok: true, mensaje: 'Simulación guardada' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Obtener historial de simulaciones de un alumno en un curso
app.get('/api/simulations/:studentId/:courseId', async (req, res) => {
  const { studentId, courseId } = req.params;
  try {
    const historial = await Simulation.find({ student_id: studentId, course_id: courseId }).sort({ fecha: -1 });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Backend funcionando',
    endpoints: [
      'GET /api/courses/:studentId',
      'GET /api/grades/:studentId/:courseId',
      'POST /api/calculateAverage',
      'POST /api/calculateRequiredGrade',
      'POST /api/saveSimulation',
      'GET /api/simulations/:studentId/:courseId'
    ]
  });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
