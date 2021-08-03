"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var myFunc = function (num) {
    return num * num;
};
exports.default = myFunc;
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var port = 3001;
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("server started at localhost:" + port);
});