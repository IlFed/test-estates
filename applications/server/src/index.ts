import express from 'express';
import { EstateResolver } from './resolvers/estate.resolver';

const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const estates = new EstateResolver();

app.get('/estates', (req, res) => {
  const params = req.query;
  const result = estates.getEstates(params);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
