const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(cors());

const API_URL = "https://1930-34-125-167-120.ngrok-free.app/"; 

app.get('/api/:modelo', async (req, res) => {
  const { modelo } = req.params;
  const { pregunta } = req.query;

  try {
    const response = await axios.get(`${API_URL}${modelo}`, {
      params: { pregunta }
    });
    res.json({ respuesta: response.data.respuesta });
  } catch (error) {
    res.json({ respuesta: ` Error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
