import { createReducer } from "@reduxjs/toolkit";
const initialState = {
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


    .addCase("RegisterRequest", (state) => {
        state.loading = true;
    })

    .addCase("RegisterSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    })

    .addCase("RegisterFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })
    
    .addCase("LoadUserRequest", (state) => {
        state.loading = true;
    })
    
    .addCase("LoadUserSuccess",(state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    })

    .addCase("LoadUserFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })

})


export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("PostOfFollowingRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("PostOfFollowingSuccess", (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  });
  builder.addCase("PostOfFollowingFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
})



//make a reducer => then add it to the store => then dispatch it in the Actions => then use it in the component