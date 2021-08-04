const sharp = require('sharp');


const image_processing = (filename: string | unknown, width: Number, height: Number, output_filename: string) : Promise<unknown>=> {

  return sharp('images/full/' + (filename as string))
        .rotate()
        .resize(Number(width), Number(height))
        .jpeg( { mozjpeg: true })
        .toFile('images/thumb/' + output_filename)
}


export default image_processing
