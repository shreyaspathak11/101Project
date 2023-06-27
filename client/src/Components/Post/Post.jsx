import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../Actions/Post';
import { getFollowingsPosts } from '../../Actions/User';
import User from '../User/User';

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerId,
  ownerName,
  ownerImage,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async() => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    
     if (isAccount) {
      console.log("dispatch(getMyPosts());")
    } else {
      dispatch(getFollowingsPosts());
    }
  };

  const deletePostHandler = () => {
    console.log("Delete Post");
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0? true: false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography fontWeight={700} variant='h4'>Liked By</Typography>

          {likes.map((like) => (
            <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
          ))}
          </div>
      </Dialog>
    </div>
  );
};

export default Post;
