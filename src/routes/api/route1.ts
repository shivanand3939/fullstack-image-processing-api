import express from 'express';
const routes1 = express.Router();
import validator from './../../middleware/urlvalidator';
import {promises as fsPromises} from 'fs';
import image_processing from './../../image_processing/sharp'

routes1.get('/', validator.urlvalidator, async (req, res, next : Function) => {

    let filename: (string | unknown) = req.query['filename']
    let width: (string | unknown) = req.query['width']
    let height: (string | unknown) = req.query['height']
    console.log('filename: ', filename, 'width: ', width, 'height: ', height)

    let output_filename : string = (filename as string).split('.jpg')[0]
    output_filename = output_filename + '-' + width + '-' + height + '-.jpg'
    console.log('dir: ',  __dirname + '/../../../images/thumb/')
    try {

  			let fileData = await fsPromises.open(  __dirname + '/../../../images/thumb/' + (output_filename as string), "r");
  			await fileData.close();
        res.status(200);
        res.sendFile( (output_filename as string), { root:  __dirname + '/../../../images/thumb' } )
        console.log('image exists', output_filename)
  	}
    catch (e)
    {
      try {
          let process_image: unknown = await image_processing(filename, Number(width), Number(height), output_filename)
          console.log('process_image: ', process_image)
          res.status(200);
          res.sendFile( (output_filename as string), { root:  __dirname + './../../../images/thumb' });
      }
      catch (err)
      {
          res.status(404);
          res.send('inside test error 404' + err);
      }

      //.then( (data : unknown) => { res.status(200); res.sendFile( (output_filename as string), { root:  __dirname + './../../../images/thumb' }) })
      //.catch( (err : string) => { res.status(404); res.send('inside test error 404' + err); });

      console.log('image does not exists', output_filename)
  	}


});


export default routes1;
