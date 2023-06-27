import React, { useEffect } from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import { getAllUsers, getFollowingsPosts } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  
  const { error: likeError, message } = useSelector((state) => state.like);

    useEffect(() => { 
        dispatch(getFollowingsPosts());
        dispatch(getAllUsers()); 
    }, [dispatch])

    useEffect(() => {
      if (error) {
        console.log(error);
        dispatch({ type: "clearErrors" });
      }
  
      if (likeError) {
        console.log(likeError);
        dispatch({ type: "clearErrors" });
      }
      if (message) {
        console.log(message);
        dispatch({ type: "clearMessage" });
      }
    }, [ error, message, likeError, dispatch]);

  return  loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts  ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
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

}

export default Home