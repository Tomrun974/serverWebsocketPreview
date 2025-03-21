// websocket-server/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('🔌 Client connecté :', socket.id);
});

app.post('/preview', (req, res) => {
  const previewData = req.body;
  io.emit('preview', previewData);
  res.status(200).json({ status: 'ok' });
});

// IMPORTANT : Render utilise une variable d'environnement PORT
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Serveur WebSocket lancé sur le port ${PORT}`);
});
