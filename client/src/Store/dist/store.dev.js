"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _User = require("../Reducers/User");

var store = (0, _toolkit.configureStore)({
  reducer: {
    // reducers
    user: _User.userReducer
  }
});
var _default = store;
exports["default"] = _default;