import express from 'express';
import routes1 from './api/route1';
const routes = express.Router();



routes.get('/', (req, res) => {

  res.send('main api route');
});

routes.use('/images', routes1);

export default routes;
