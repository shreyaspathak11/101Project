import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Reducers/User';

const initialState = {}
const store = configureStore(initialState, {
    reducer: {
        // reducers
        user: userReducer,

    }
})

export default store;