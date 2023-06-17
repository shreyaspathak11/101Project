"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {};
var userReducer = (0, _toolkit.createReducer)(initialState, function (builder) {
  // reducers
  builder.addCase("LoginRequest", function (state) {
    // LoginRequest is the action type
    state.loading = true;
  });
  builder.addCase("LoginSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase("LoginFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("RegisterRequest", function (state) {
    state.loading = true;
  });
  builder.addCase("RegisterSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase("RegisterFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("LoadUserRequest", function (state) {
    state.loading = true;
  });
  builder.addCase("LoadUserSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase("LoadUserFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
  });
});
exports.userReducer = userReducer;