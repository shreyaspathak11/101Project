import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
  };

export const userReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("LoginRequest", (state) => {
      state.loading = true;

    })
  
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;

    })

    .addCase("LoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; 
      state.isAuthenticated = false;
    })


    builder.addCase("RegisterRequest", (state) => {
        state.loading = true;
    })

    builder.addCase("RegisterSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    })

    builder.addCase("RegisterFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })
    
    builder.addCase("LoadUserRequest", (state) => {
        state.loading = true;
    })
    
    builder.addCase("LoadUserSuccess",(state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    })

    builder.addCase("LoadUserFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })

})
