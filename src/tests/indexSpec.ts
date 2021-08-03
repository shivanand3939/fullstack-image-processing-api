import axios from 'axios'
import { Request, Response } from 'express';
const VALID_FILE = "icelandwaterfall.jpg";
const INVALID_FILE = "invalid.jpg";



//Write a test for valid file
it('checking if a valid file creates a valid image', async () => {
   let url: string = 'http://localhost:3001/api/images?filename=' + VALID_FILE + '&width=300&height=200'
   let res:Response = await axios.get(url)
   expect(res.status).toEqual(200)
});


// write a test for invalid file
it('checking if a invalid file sends 404 error', async () => {
  //Send a request to transform, and see if the file is created .. can check status
   try
   {
     let url: string = 'http://localhost:3001/api/images?filename=' + INVALID_FILE + '&width=300&height=200'
     let res:Response = await axios.get(url);
   }
   catch (err)
   {
     expect(err.response.status).toEqual(404)
   }
});
