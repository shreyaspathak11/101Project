import React, { useEffect } from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import { getFollowingsPosts } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'

const Home = () => {
    
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(getFollowingsPosts());

    }, [dispatch])

  return (
    loading? <Loader /> : (
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

    <User
        userId={"user._id"}
        name={"user.name"}
        avatar={"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTK7Os2YW_6OfJJGh9rvPUSbNYqUwQXZce6mMIrqMasLen8sg4BDbHwN-UMOAV6Q_lXdvqdhbY-NqCTcGA"}
        />

            </div>
    </div>
  )
  )
}

export default Home