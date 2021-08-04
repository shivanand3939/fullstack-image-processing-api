import express from 'express';
import { Router, Request, Response } from 'express';
import validator from './../../middleware/urlvalidator';
import {promises as fsPromises} from 'fs';
import image_processing from './../../image_processing/sharp'


const routes1: Router = express.Router();
routes1.get('/', validator.urlvalidator, async (req: Request, res: Response) => {

    let filename: (string | unknown) = req.query['filename']
    let width: (string | unknown) = req.query['width']
    let height: (string | unknown) = req.query['height']

    let output_filename : string = (filename as string).split('.jpg')[0]
    output_filename = output_filename + '-' + width + '-' + height + '-.jpg'
    try
    {
      let fileData = await fsPromises.open( __dirname + '/../../../images/thumb/' + (output_filename as string), "r");
      await fileData.close();
      res.status(200);
      res.sendFile( (output_filename as string), { root:  __dirname + '/../../../images/thumb' } ) 
    }
    catch (e)
    {
      try {
          await image_processing(filename, Number(width), Number(height), output_filename)

          res.status(200);
          res.sendFile( (output_filename as string), { root:  __dirname + './../../../images/thumb' });
      }
      catch (err)
      {
          res.status(404);
          res.send('inside test error 404' + err);
      }

    }


});


export default routes1;
