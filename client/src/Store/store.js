import { configureStore } from '@reduxjs/toolkit';
import { userReducer, postOfFollowingReducer, allUsersReducer } from '../Reducers/User';
import { likeReducer } from '../Reducers/Post';

const store = configureStore( {
    reducer: {
        // reducers
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,

    }
})

export default store;