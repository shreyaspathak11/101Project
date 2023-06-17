"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null
};
var userReducer = (0, _toolkit.createReducer)(initialState, function (builder) {
  builder.addCase("LoginRequest", function (state) {
    state.loading = true;
  }).addCase("LoginSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  }).addCase("LoginFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  });
  builder.addCase("RegisterRequest", function (state) {
    state.loading = true;
  });
  builder.addCase("RegisterSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  });
  builder.addCase("RegisterFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  });
  builder.addCase("LoadUserRequest", function (state) {
    state.loading = true;
  });
  builder.addCase("LoadUserSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  });
  builder.addCase("LoadUserFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  });
});
exports.userReducer = userReducer;