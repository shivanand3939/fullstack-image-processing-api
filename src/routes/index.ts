import express from 'express';
import routes1 from './api/route1';
import { Router, Request, Response } from 'express';

const routes: Router = express.Router();



routes.get('/', (req: Request, res: Response) => {
  res.send('main api route');
});

routes.use('/images', routes1);

export default routes;
