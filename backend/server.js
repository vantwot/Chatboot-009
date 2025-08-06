const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(cors());

const API_URL = "http://278db9c72719.ngrok-free.app/";  
app.get('/api/:modelo', async (req, res) => {
  let { modelo } = req.params;
  modelo = decodeURIComponent(modelo);
  modelo = modelo.replace(/[\p{Emoji}\s]/gu, '');
  const { pregunta } = req.query;

  try {
    const response = await axios.get(`${API_URL}/${modelo}`, {
      params: { pregunta }
    });
    res.json({ 
      respuesta: response.data.respuesta,
      modelo_limpio: modelo
    });
  } catch (error) {
    res.json({ 
      respuesta: ` Error: ${error.message}`,
      modelo_limpio: modelo
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
