const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/calculateAverage', (req, res) => {
  const { evaluaciones } = req.body;
  
  if (!evaluaciones || evaluaciones.length === 0) {
    return res.status(400).json({ error: 'No hay evaluaciones' });
  }

  const suma = evaluaciones.reduce((acc, ev) => acc + ev.nota * ev.peso, 0);
  const total = evaluaciones.reduce((acc, ev) => acc + ev.peso, 0);

  res.json({ promedio: suma / total });
});

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

app.get('/api/getHistory', (req, res) => {
  res.json([]);
});

app.post('/api/saveSimulation', (req, res) => {
  res.json({ ok: true, mensaje: 'Simulación guardada' });
});

app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Backend funcionando',
    endpoints: [
      'POST /api/calculateAverage',
      'POST /api/calculateRequiredGrade',
      'GET /api/getHistory',
      'POST /api/saveSimulation'
    ]
  });
});

module.exports = app;
