import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    user: null,
    error: null,
  };

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase("LoginRequest", (state) => {
      state.loading = true;
      state.error = null; // Clear any previous errors
    });
  
    builder.addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Clear any previous errors
    });
  
    builder.addCase("LoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload.message; // Store only the error message
    });


    builder.addCase("RegisterRequest", (state) => {
        state.loading = true;
    })

    builder.addCase("RegisterSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })

    builder.addCase("RegisterFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    
    builder.addCase("LoadUserRequest", (state) => {
        state.loading = true;
    })
    
    builder.addCase("LoadUserSuccess",(state, action) => {
        state.loading = false;
        state.user = action.payload;
    })

    builder.addCase("LoadUserFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

})
