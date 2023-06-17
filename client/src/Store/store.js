import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Reducers/User';

const store = configureStore( {
    reducer: {
        // reducers
        user: userReducer,

    }
})

export default store;