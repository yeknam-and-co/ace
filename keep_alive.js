import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('HES HERE!');
});

app.listen(PORT, () => {
  console.log(`Keep-alive web server running on port ${PORT}`);
});
