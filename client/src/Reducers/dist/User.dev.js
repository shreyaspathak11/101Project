"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {};
var userReducer = (0, _toolkit.createReducer)(initialState, {
  // reducers
  LoginRequest: function LoginRequest(state) {
    state.loading = true;
  },
  LoginSuccess: function LoginSuccess(state, action) {
    state.loading = false;
    state.user = action.payload;
  },
  LoginFailure: function LoginFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  RegisterRequest: function RegisterRequest(state) {
    state.loading = true;
  },
  RegisterSuccess: function RegisterSuccess(state, action) {
    state.loading = false;
    state.user = action.payload;
  },
  RegisterFailure: function RegisterFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  LoadUserRequest: function LoadUserRequest(state) {
    state.loading = true;
  },
  LoadUserSuccess: function LoadUserSuccess(state, action) {
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFailure: function LoadUserFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  }
});
exports.userReducer = userReducer;