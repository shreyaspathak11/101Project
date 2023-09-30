import { configureStore } from '@reduxjs/toolkit';
import { userReducer, postOfFollowingReducer, allUsersReducer, userProfileReducer } from '../Reducers/User';
import { likeReducer, myPostsReducer } from '../Reducers/Post';

const store = configureStore( {
    reducer: {
        // reducers
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        
    }
})

export default store;