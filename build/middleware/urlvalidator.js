'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = require('fs');
var validate_params = function (filename, width, height) {
  return __awaiter(void 0, void 0, void 0, function () {
    var is_file_exists, is_file_format_valid, fileData, e_1, is_size_valid;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          is_file_exists = false;
          is_file_format_valid = false;
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [
            4 /*yield*/,
            fs_1.promises.open(__dirname + '/../images/full/' + filename, 'r'),
          ];
        case 2:
          fileData = _a.sent();
          return [4 /*yield*/, fileData.close()];
        case 3:
          _a.sent();
          if (
            filename.split('.jpg').length > 1 ||
            filename.split('.jpeg').length > 1
          ) {
            is_file_format_valid = true;
          }
          is_file_exists = true;
          return [3 /*break*/, 5];
        case 4:
          e_1 = _a.sent();
          is_file_exists = false;
          return [3 /*break*/, 5];
        case 5:
          is_size_valid = true;
          try {
            width = Number(width);
            height = Number(height);
          } catch (_b) {
            is_size_valid = false;
          }
          if (isNaN(width) || isNaN(height)) {
            is_size_valid = false;
          }
          return [
            2 /*return*/,
            [is_file_exists, is_file_format_valid, is_size_valid],
          ];
      }
    });
  });
};
var urlvalidator = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var filename,
      width,
      height,
      _a,
      is_file_exists,
      is_file_format_valid,
      is_size_valid;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          filename = req.query['filename'];
          width = req.query['width'];
          height = req.query['height'];
          return [4 /*yield*/, validate_params(filename, width, height)];
        case 1:
          (_a = _b.sent()),
            (is_file_exists = _a[0]),
            (is_file_format_valid = _a[1]),
            (is_size_valid = _a[2]);
          console.log(
            'is_file_exists: ',
            is_file_exists,
            is_file_format_valid,
            is_size_valid
          );
          if (!is_file_exists) {
            res.status(404);
            res.send('404 - The image does not exist in the images folder.');
          } else if (!is_file_format_valid) {
            res.status(404);
            res.send(
              '404 - The image format is invalid. Only supports jpg files'
            );
          } else if (!is_size_valid) {
            res.status(404);
            res.send('404 - Please enter valid height and width param');
          } else {
            next();
          }
          return [2 /*return*/];
      }
    });
  });
};
exports.default = {
  urlvalidator: urlvalidator,
  validate_params: validate_params,
};
