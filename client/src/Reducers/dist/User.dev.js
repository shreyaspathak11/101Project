"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postOfFollowingReducer = exports.userReducer = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {};
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
  }).addCase("RegisterRequest", function (state) {
    state.loading = true;
  }).addCase("RegisterSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  }).addCase("RegisterFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  }).addCase("LoadUserRequest", function (state) {
    state.loading = true;
  }).addCase("LoadUserSuccess", function (state, action) {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  }).addCase("LoadUserFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  }).addCase("clearErrors", function (state) {
    state.error = null;
  });
});
exports.userReducer = userReducer;
var postOfFollowingReducer = (0, _toolkit.createReducer)(initialState, function (builder) {
  builder.addCase("PostOfFollowingRequest", function (state) {
    state.loading = true;
  });
  builder.addCase("PostOfFollowingSuccess", function (state, action) {
    state.loading = false;
    state.posts = action.payload;
  });
  builder.addCase("PostOfFollowingFailure", function (state, action) {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("clearErrors", function (state) {
    state.error = null;
  });
}); //make a reducer => then add it to the store => then dispatch it in the Actions => then use it in the component

exports.postOfFollowingReducer = postOfFollowingReducer;