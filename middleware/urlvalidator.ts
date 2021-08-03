import {promises as fsPromises} from 'fs';

import { Request, Response } from 'express';

const urlvalidator = async (req: Request, res: Response, next : Function) => {

  let filename: (string | unknown) = req.query['filename']
  let width: (string | unknown) = req.query['width']
  let height: (string | unknown) = req.query['height']

  let is_file_exists : boolean = false
  let is_file_format_valid : boolean = false
  try {
			let fileData = await fsPromises.open(  __dirname + '/../images/full/' + (filename as string), "r");
			await fileData.close();
      if (( (filename as string).split('.jpg').length > 1) || ((filename as string).split('.jpeg').length > 1))
      {
          is_file_format_valid = true;
      }
      is_file_exists = true;
	}
  catch (e)
  {
			is_file_exists = false;
	}




  let is_size_valid : boolean = true;
  try
  {
    width = Number((width as string));
    height = Number((height as string));
  }
  catch
  {
      is_size_valid = false;
  }

  if (isNaN((width as number)) || isNaN((height as number))){
    is_size_valid = false;
  }

  if (!is_file_exists)
  {
      res.status(404);
      res.send('404 - The image does not exist in the images folder.')
  }
  else if (!is_file_format_valid)
  {
      res.status(404);
      res.send('404 - The image format is invalid. Only supports jpg files')
  }
  else if (!is_size_valid)
  {
      res.status(404);
      res.send('404 - Please enter valid height and width param')
  }
  else
  {
    next()
  }

}


export default urlvalidator;
