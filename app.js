const express = require('express');
const app = express();
const port = 3000;

// Sample endpoint (intentionally vulnerable for DAST testing)
app.get('/eval', (req, res) => {
  const input = req.query.q;
  try {
    const result = eval(input); // ❌ Do NOT use eval in production
    res.send(`Evaluated: ${result}`);
  } catch {
    res.status(400).send('Invalid input');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js API!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
