# fullstack-image-processing-api

This is the first project in Udacity - Fullstack developer nanodegree program.
This is a simple express application, which resizes an input image using sharp library.
Unit tests are done via jasmine.

Steps to set-up
- Run 'npm install .' to install all dependencies
- start the server using 'node build/src/index.js' 
- The end-point is http://localhost:3001/api/images?filename={filename}&width={200}&height={200}
    - 3 params are mandatory, namely filename, width, height
    - the filename should be present in the build/images/full folder and the processed image will be in build/images/thumb folder
    - inherent caching is present i.e if the file is already processed then will show the processed file itself
- To perform testing using jasmine, run 'npm run test'
    - have configured 2 tests, one for valid image and another for invalid image
