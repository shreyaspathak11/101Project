"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  loading: false,
  user: null,
  error: null
};
var userReducer = (0, _toolkit.createReducer)(initialState, function (builder) {
  builder.addCase("LoginRequest", function (state) {
    state.loading = true;
    state.error = null; // Clear any previous errors
  });
  builder.addCase("LoginSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.error = null; // Clear any previous errors
  });
  builder.addCase("LoginFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload.message; // Store only the error message
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