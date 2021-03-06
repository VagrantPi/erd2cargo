'use strict';

require('babel-core/register');

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _string_decoder = require('string_decoder');

var _jsBeautify = require('js-beautify');

var _argumentParser = require('./lib/argument-parser');

var _argumentParser2 = _interopRequireDefault(_argumentParser);

var _package = require('./package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {

  var ct = require('./lib/constants');
  var Erd2Cargo = {
    appDir: _path2.default.dirname(require.main.filename),

    decoder: new _string_decoder.StringDecoder('utf8'),

    config: {
      init: false
    },

    init: function init() {
      this.parse();
    },

    parse: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                // console.error('this.config', this.config);
                this.config = _argumentParser2.default.parse(process.argv);
                config = this.config;

                if (!config.help) {
                  _context.next = 7;
                  break;
                }

                this.help();
                _context.next = 22;
                break;

              case 7:
                if (!config.clean) {
                  _context.next = 12;
                  break;
                }

                _context.next = 10;
                return this.cleanFolder();

              case 10:
                _context.next = 22;
                break;

              case 12:
                if (!config.version) {
                  _context.next = 16;
                  break;
                }

                this.version();
                _context.next = 22;
                break;

              case 16:
                if (config.file) {
                  _context.next = 20;
                  break;
                }

                this.shell();
                _context.next = 22;
                break;

              case 20:
                _context.next = 22;
                return this.checkFile();

              case 22:
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](0);

                this.message(_context.t0, ct.MSG_ERROR);

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 24]]);
      }));

      function parse() {
        return _ref.apply(this, arguments);
      }

      return parse;
    }(),

    checkFile: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var file, exist;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                file = null;
                _context2.next = 3;
                return _fs2.default.existsSync(this.config.file);

              case 3:
                exist = _context2.sent;

                if (!exist) {
                  _context2.next = 17;
                  break;
                }

                _context2.prev = 5;
                _context2.next = 8;
                return _fs2.default.readFileSync(this.config.file, 'utf8');

              case 8:
                file = _context2.sent;
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](5);

                file = false;
                this.message('! Can not access ERD file.', ct.MSG_ERROR);

              case 15:
                _context2.next = 18;
                break;

              case 17:
                console.warn('! Giving ERD file path is not exist.');

              case 18:
                if (!(exist && file)) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 21;
                return this.start();

              case 21:
                _context2.next = 24;
                break;

              case 23:
                this.message('ERD to Cargo exporting stop.', ct.MSG_ERROR);

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 11]]);
      }));

      function checkFile() {
        return _ref2.apply(this, arguments);
      }

      return checkFile;
    }(),

    cleanFolder: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var isErdPathExists, cmd, rmExportPath, isCargoPathExists, _cmd, _rmExportPath;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                console.log('@ cleanFolder appDir is located=>', this.appDir);
                _context3.next = 4;
                return _fs2.default.existsSync(this.config.exportPath.erd);

              case 4:
                isErdPathExists = _context3.sent;

                if (!isErdPathExists) {
                  _context3.next = 14;
                  break;
                }

                cmd = 'rm -rf ' + this.config.exportPath.erd;

                console.log('@ cleanFolder command=>' + cmd);
                _context3.next = 10;
                return _child_process2.default.execSync(cmd);

              case 10:
                rmExportPath = _context3.sent;

                if (rmExportPath) console.log('@ Remove sucecssed.');
                _context3.next = 15;
                break;

              case 14:
                console.log('@ Default ERD export path is not exist!');

              case 15:
                _context3.next = 17;
                return _fs2.default.existsSync(this.config.exportPath.cargo);

              case 17:
                isCargoPathExists = _context3.sent;

                if (!isCargoPathExists) {
                  _context3.next = 27;
                  break;
                }

                _cmd = 'rm -rf ' + this.config.exportPath.cargo;

                console.log('@ cleanFolder command=>' + _cmd);
                _context3.next = 23;
                return _child_process2.default.execSync(_cmd);

              case 23:
                _rmExportPath = _context3.sent;

                if (_rmExportPath) console.log('@ Remove sucecssed.');
                _context3.next = 28;
                break;

              case 27:
                console.log('@ Default Cargo CMS export path is not exist!');

              case 28:
                _context3.next = 30;
                return this.checkFile();

              case 30:
                _context3.next = 35;
                break;

              case 32:
                _context3.prev = 32;
                _context3.t0 = _context3['catch'](0);

                this.message(_context3.t0, ct.MSG_ERROR);

              case 35:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 32]]);
      }));

      function cleanFolder() {
        return _ref3.apply(this, arguments);
      }

      return cleanFolder;
    }(),

    exportErd: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var $c, parameter, buildErdScript, execBuildErd, textChunk;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                $c = this.config;
                parameter = '--export=' + $c.mode + ' ' + $c.file + ' ' + $c.exportPath.erd + ' ' + $c.exportPath.cargo;
                buildErdScript = $c.pathPhp + ' ' + $c.pathMwse + ' ' + parameter;

                console.log('@ exec script=>', buildErdScript);

                _context4.next = 7;
                return _child_process2.default.execSync(buildErdScript);

              case 7:
                execBuildErd = _context4.sent;
                textChunk = this.decoder.write(execBuildErd);

                console.log('@ exportErd result==>' + textChunk + '.');
                return _context4.abrupt('return', true);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);

                // throw new Error(error);
                this.message(_context4.t0, ct.MSG_ERROR);
                return _context4.abrupt('return', false);

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function exportErd() {
        return _ref4.apply(this, arguments);
      }

      return exportErd;
    }(),

    scaffold: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var erdExportPath, exist, readRawDir, rawCount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, babelNode, appRoot, execScaffold, result, textChunk;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                erdExportPath = this.config.exportPath.erd;
                _context5.next = 4;
                return _fs2.default.existsSync(erdExportPath);

              case 4:
                exist = _context5.sent;

                if (exist) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt('return', console.error('No ERD exported  folder \'' + erdExportPath + '\' exists.'));

              case 7:
                _context5.next = 9;
                return _fs2.default.readdirSync(erdExportPath);

              case 9:
                readRawDir = _context5.sent;

                console.log('@ Models will be export to Cargo CMS=>', readRawDir, '.\n');

                rawCount = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 15;
                _iterator = readRawDir[Symbol.iterator]();

              case 17:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context5.next = 35;
                  break;
                }

                file = _step.value;

                rawCount++;

                if (!file.includes('.bak')) {
                  _context5.next = 23;
                  break;
                }

                console.warn('! Skipped ' + file + ' because it is a .bak file.\n.');
                return _context5.abrupt('continue', 32);

              case 23:
                console.log('@ ' + rawCount + '/' + readRawDir.length + ' file name=> ' + file);
                babelNode = typeof projRoot !== 'undefined' ? 'node' : 'node_modules/babel-cli/bin/babel-node.js';
                appRoot = typeof projRoot !== 'undefined' ? projRoot : '.';
                execScaffold = babelNode + ' ' + appRoot + '/scaffold.js -f ' + erdExportPath + '/' + file;
                _context5.next = 29;
                return _child_process2.default.execSync(execScaffold);

              case 29:
                result = _context5.sent;
                textChunk = this.decoder.write(result);

                if (result) console.log('@ export scaffold result==>\n' + textChunk + '.');

              case 32:
                _iteratorNormalCompletion = true;
                _context5.next = 17;
                break;

              case 35:
                _context5.next = 41;
                break;

              case 37:
                _context5.prev = 37;
                _context5.t0 = _context5['catch'](15);
                _didIteratorError = true;
                _iteratorError = _context5.t0;

              case 41:
                _context5.prev = 41;
                _context5.prev = 42;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 44:
                _context5.prev = 44;

                if (!_didIteratorError) {
                  _context5.next = 47;
                  break;
                }

                throw _iteratorError;

              case 47:
                return _context5.finish(44);

              case 48:
                return _context5.finish(41);

              case 49:
                return _context5.abrupt('return', true);

              case 52:
                _context5.prev = 52;
                _context5.t1 = _context5['catch'](0);

                // throw new Error(error);
                this.message(_context5.t1, ct.MSG_ERROR);
                return _context5.abrupt('return', false);

              case 56:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 52], [15, 37, 41, 49], [42,, 44, 48]]);
      }));

      function scaffold() {
        return _ref5.apply(this, arguments);
      }

      return scaffold;
    }(),

    appendBody: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(target, format) {
        var isExist, data, dataWithBody, dataWithFix;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _fs2.default.existsSync(target);

              case 3:
                isExist = _context6.sent;

                if (!isExist) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 7;
                return _fs2.default.readFileSync(target);

              case 7:
                data = _context6.sent;
                dataWithBody = format(data);
                dataWithFix = (0, _jsBeautify.js_beautify)(dataWithBody, { indent_size: 2 });
                _context6.next = 12;
                return _fs2.default.writeFileSync(target, dataWithFix);

              case 12:
                this.message('AppendBody to \'' + target + '\' successed.', ct.MSG_SUCCESS);
                _context6.next = 16;
                break;

              case 15:
                console.warn('@ Target ' + target + ' is not exist so skip to beautify.');

              case 16:
                return _context6.abrupt('return', true);

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6['catch'](0);

                // throw new Error(error);
                this.message(_context6.t0, ct.MSG_ERROR);
                return _context6.abrupt('return', false);

              case 23:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 19]]);
      }));

      function appendBody(_x, _x2) {
        return _ref6.apply(this, arguments);
      }

      return appendBody;
    }(),

    beautifyJs: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(file) {
        var _this = this;

        var modelPath, readModelDir, count, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                modelPath = this.config.exportPath.cargo + '/api/models';
                _context8.next = 4;
                return _fs2.default.readdirSync(modelPath);

              case 4:
                readModelDir = _context8.sent;

                // console.log('@ Model Js files will be beautify=>', readModelDir);
                count = 0;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context8.prev = 9;

                _loop = function _loop() {
                  var file = _step2.value;

                  var filePath = modelPath + '/' + file;
                  _fs2.default.readFile(filePath, 'utf8', function () {
                    var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(err, data) {
                      var dataWithFix;
                      return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              if (!err) {
                                _context7.next = 2;
                                break;
                              }

                              throw err;

                            case 2:
                              dataWithFix = (0, _jsBeautify.js_beautify)(data, { indent_size: 2 });
                              // console.log(data);

                              _context7.next = 5;
                              return _fs2.default.writeFileSync(filePath, dataWithFix);

                            case 5:
                            case 'end':
                              return _context7.stop();
                          }
                        }
                      }, _callee7, _this);
                    }));

                    return function (_x4, _x5) {
                      return _ref8.apply(this, arguments);
                    };
                  }());
                };

                for (_iterator2 = readModelDir[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop();
                }
                _context8.next = 18;
                break;

              case 14:
                _context8.prev = 14;
                _context8.t0 = _context8['catch'](9);
                _didIteratorError2 = true;
                _iteratorError2 = _context8.t0;

              case 18:
                _context8.prev = 18;
                _context8.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 21:
                _context8.prev = 21;

                if (!_didIteratorError2) {
                  _context8.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return _context8.finish(21);

              case 25:
                return _context8.finish(18);

              case 26:
                this.message('Beautify files in folder \'' + modelPath + '\' successed.', ct.MSG_SUCCESS);
                return _context8.abrupt('return', true);

              case 30:
                _context8.prev = 30;
                _context8.t1 = _context8['catch'](0);

                this.message(_context8.t1, ct.MSG_ERROR);
                return _context8.abrupt('return', false);

              case 34:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 30], [9, 14, 18, 26], [19,, 21, 25]]);
      }));

      function beautifyJs(_x3) {
        return _ref7.apply(this, arguments);
      }

      return beautifyJs;
    }(),

    start: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        var exportResult, codeBeautify;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.info('@ Start!');
                _context9.prev = 1;
                _context9.next = 4;
                return this.exportErd();

              case 4:
                _context9.t0 = _context9.sent;

                if (!_context9.t0) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 8;
                return this.scaffold();

              case 8:
                _context9.t0 = _context9.sent;

              case 9:
                exportResult = _context9.t0;

                if (exportResult) {
                  _context9.next = 12;
                  break;
                }

                return _context9.abrupt('return', console.error('! Export failed.'));

              case 12:
                _context9.next = 14;
                return this.appendBody(this.config.exportPath.cargo + '/config/init/menuItem/menuItem.js', function (data) {
                  return 'module.exports.menuItem = [\n' + data + '\n];';
                });

              case 14:
                _context9.t2 = _context9.sent;

                if (!_context9.t2) {
                  _context9.next = 19;
                  break;
                }

                _context9.next = 18;
                return this.appendBody(this.config.exportPath.cargo + '/config/customRoutes.js', function (data) {
                  return 'module.exports.customRoutes = {\n' + data + '\n};';
                });

              case 18:
                _context9.t2 = _context9.sent;

              case 19:
                _context9.t1 = _context9.t2;

                if (!_context9.t1) {
                  _context9.next = 24;
                  break;
                }

                _context9.next = 23;
                return this.beautifyJs();

              case 23:
                _context9.t1 = _context9.sent;

              case 24:
                codeBeautify = _context9.t1;

                if (!exportResult && !codeBeautify) {
                  console.error('! Code beautify failed.');
                }
                _context9.next = 31;
                break;

              case 28:
                _context9.prev = 28;
                _context9.t3 = _context9['catch'](1);

                this.message(_context9.t3, ct.MSG_ERROR);

              case 31:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 28]]);
      }));

      function start() {
        return _ref9.apply(this, arguments);
      }

      return start;
    }(),

    help: function help() {
      console.log('\nUsage: node erd2cargo.js [options argument] [filePath]\n');
      console.log('Options:');

      console.log('  -ce, --cargo-export [path]\t Target a specific folder path for export ERD json to Cargo CMS. (default: `./export_cargo`).');
      console.log('  -ee, --erd-export [path]\t Target a specific folder path for export ERD to json. (default: `./export_erd`).');
      console.log('  -m, --mode [modeName]\t\t Select a specific mode.');
      console.log('  -f, --file [filePath]\t\t\t File to read (required).');
      console.log('  -p, --php [filePath]\t\t\t Target a specific PHP exec path.');
      console.log('  -F, --force-overwrite\t\t\t Force overwrite of existing files.');
      console.log('  -c, --clean\t\t\t\t Clean exist files before scaffolding.');
      console.log('  -v, --version\t\t\t\t Shows the version of this tool.');

      console.log('\nExample:');
      console.log('  erd2cargo -f erd.mwb --erd-export ./erd --cargo-export ./cargo --clean');

      console.log('\nDocumentation can be found at ... well, not yet but I am sure you will find it eventually somewhere. :p\n');
    },

    shell: function shell() {
      this.message('Please give me a file through -file! (ie. -file data.json)', ct.MSG_ERROR);

      this.help();
    },

    version: function version() {
      this.message('v' + _package.version, ct.MSG_SUCCESS);
    },

    message: function message(_message, type) {
      if (type == ct.MSG_ERROR) {
        console.log('\x1b[1;97;101m%s\x1b[0m %s', '!ERROR!', _message);
      } else if (type == ct.MSG_WARNING) {
        console.log('\x1b[1;41;103m%s\x1b[0m %s', '!WARNING!', _message);
      } else if (type == ct.MSG_SUCCESS) {
        console.log('\x1b[1;97;42m%s\x1b[0m %s', ' SUCCESS ', _message);
      } else if (type == ct.MSG_FAILED) {
        console.log('\x1b[1;97;101m%s\x1b[0m %s', '!FAIL!', _message);
      }
    },

    finalize: function finalize() {
      this.message('Finished scaffolding!', ct.MSG_SUCCESS);
    }
  };

  Erd2Cargo.init();
})();