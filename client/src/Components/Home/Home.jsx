import React, { useEffect } from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import { getAllUsers, getFollowingsPosts } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'

const Home = () => {
    
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(getFollowingsPosts());
        dispatch(getAllUsers() ); 

    }, [dispatch])

  return (
    loading===true || usersLoading===true ? <Loader /> : (
      <div className='home'>
        <div className='homeleft'>
        {
            posts && posts.length > 0 ? posts.map((post) => (
              <Post 
                key={post._id}
                caption={post.caption}
                postId={post._id}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerId={post.owner._id}
                ownerName={post.owner._id}
                ownerImage={post.owner.avatar.url}      
            />
            )) :  <Typography variant="h6"> No posts yet</Typography>
        }
           
        </div>
            <div className='homeright'>
            {users && users.length > 0 ? (
              users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
             ))
            ) : (
              <Typography>No Users Yet</Typography>
            )}
            </div>
    </div>
  )
  )
}

export default Home