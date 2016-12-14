'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGqlSchema = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const loadGqlSchema = exports.loadGqlSchema = function (pattern) {
  return new Promise((() => {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      try {
        const files = yield getGlob(pattern);
        const schemaFile = yield makeSchema(files);
        resolve(schemaFile);
      } catch (err) {
        reject(err);
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());
};

/**
 * @param  {String} pattern
 * @return {Promise}
 */
function getGlob(pattern) {
  return new Promise((resolve, reject) => {
    (0, _glob2.default)(pattern, (err, files) => {
      if (err || files.length === 0) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

/**
 * @param  {Array} fileNames
 * @return {Promise}
 */
function makeSchema(fileNames) {
  const promises = fileNames.map(readFile);
  return Promise.all(promises).then(fileContentArr => {
    return fileContentArr.join();
  }).catch(err => {
    throw err;
  });
}

/**
 * @param  {String} fileName
 * @return {Promise}
 */
function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}