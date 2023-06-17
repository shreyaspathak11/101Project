import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const userReducer = createReducer(initialState,(builder) => {
    // reducers
    builder.addCase("LoginRequest", (state) => {    // LoginRequest is the action type
        state.loading = true;
    })

    builder.addCase("LoginSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })

    builder.addCase("LoginFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    

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
