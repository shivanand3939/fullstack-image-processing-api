import axios from 'axios';
import { Response } from 'express';
import validator from './../middleware/urlvalidator';
import { promises as fsPromises } from 'fs';
import image_processing from './../image_processing/sharp';

const VALID_FILE = 'icelandwaterfall.jpg';
const INVALID_FILE = 'invalid.jpg';
const width = 300;
const height = 300;

describe('Validating functions', () => {
  it('validating input params', async () => {
    let res = await validator.validate_params(VALID_FILE, 300, 300);
    expect(res).toEqual([true, true, true]);
  });

  it('validating sharp image processing', async () => {
    let output_filename: string =
      VALID_FILE.split('.jpg')[0] +
      '-' +
      width.toString() +
      '-' +
      height.toString() +
      '-.jpg';
    await image_processing(
      VALID_FILE,
      Number(width),
      Number(height),
      output_filename
    );
    try {
      let fileData = await fsPromises.open(
        __dirname + '/../../../images/thumb/' + (output_filename as string),
        'r'
      );
      await fileData.close();
      expect(fileData).toBeTruthy();
    } catch (err) {
      //Throwing an error as this should not happen
      expect(5).toBe(15);
    }
  });
});

describe('Validating http requests: ', () => {
  //Write a test for valid file
  it('checking if a valid file creates a valid image', async () => {
    let url: string =
      'http://localhost:3001/api/images?filename=' +
      VALID_FILE +
      '&width=300&height=200';
    let res: Response = await axios.get(url);
    expect(res.status).toEqual(200);
  });

  // write a test for invalid file
  it('checking if a invalid file sends 404 error', async () => {
    //Send a request to transform, and see if the file is created .. can check status
    try {
      let url: string =
        'http://localhost:3001/api/images?filename=' +
        INVALID_FILE +
        '&width=300&height=200';
      let res: Response = await axios.get(url);
      expect(res.status).toEqual(404);
    } catch (err) {
      expect(err.response.status).toEqual(404);
    }
  });
});
