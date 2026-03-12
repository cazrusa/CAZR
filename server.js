// ================================================
//  PRICE HUNTER — Backend Server
//  Node.js + Express
//  Tu API Key de Anthropic va SOLO aquí (en el server)
// ================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // para imágenes base64
app.use(express.static(path.join(__dirname, 'public')));

// ── Variables de entorno ──────────────────────────
// En producción: configura ANTHROPIC_API_KEY en tu panel de Render/Railway
// En local: crea un archivo .env con: ANTHROPIC_API_KEY=sk-ant-...
require('dotenv').config();
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.warn('⚠️  ANTHROPIC_API_KEY no configurada. Configúrala en tus variables de entorno.');
}

// ── Ruta principal: proxy a Anthropic API ─────────
app.post('/api/search', async (req, res) => {
  try {
    const { messages, system } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API Key no configurada en el servidor.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Más económico — perfecto para CAZR
        max_tokens: 4000,
        system: system || '',
        messages: messages || []
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return res.status(response.status).json({ error: error.error?.message || 'Error en la API' });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Error interno del servidor: ' + err.message });
  }
});

// ── Health check ──────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'CAZR',
    apiConfigured: !!ANTHROPIC_API_KEY
  });
});

// ── Iniciar servidor ──────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎯 CAZR corriendo en http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${ANTHROPIC_API_KEY ? '✓ Configurada' : '✗ Falta configurar'}`);
});
