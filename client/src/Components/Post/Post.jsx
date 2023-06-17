import React, { useState } from 'react'
import './Post.css'
import { Avatar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
  } from "@mui/icons-material";

const Post = ({
    postId, 
    caption,
postImage,
likes=[],
comments=[],
ownerId,
ownerName,
ownerImage,
isDelete = false,
isAccount = false,
}) => {

    const [liked, setLiked] = useState(false);

  
    const handleLike = () => {
        setLiked(!liked);
    };
    const deletePostHandler = () => {
        console.log("Delete Post");
    };
  return (
    <div className="post">
      <div className="postHeader">
      {isAccount ? (<Button>
        <MoreVert />
      </Button> ): null}
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
        style={{ alignSelf: "center" }}>
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
        
      >
        <Typography>{"likes.length"} Likes</Typography>
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

      



    </div>
  )
}

export default Post

