'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var sharp = require('sharp');
var image_processing = function (filename, width, height, output_filename) {
  return sharp('images/full/' + filename)
    .rotate()
    .resize(Number(width), Number(height))
    .jpeg({ mozjpeg: true })
    .toFile('images/thumb/' + output_filename);
};
exports.default = image_processing;
