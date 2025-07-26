import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(port, () => console.log('Test server running on port', port));
