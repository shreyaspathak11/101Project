const mongoose = require("mongoose");           //import mongoose for creating schema

const postSchema = new mongoose.Schema({          //create schema of POST
  // Schema contains the following fields:
  caption: String,                              //caption of post             

  image: {                                    //image of post               
    public_id: String,
    url: String,
  },

  owner: {                                 //owner of post  
    type: mongoose.Schema.Types.ObjectId,       //type of owner here object id mongoose.schema.type.objectid means id of owner
    ref: "User",                                //ref means reference to user
  },

  createdAt: {                            //created at of post                  
    type: Date,                        //type is date           
    default: Date.now,              //default value of created at is date.now
  },

  likes: [                      //likes of post
    {
      type: mongoose.Schema.Types.ObjectId,       //type of likes here object id mongoose.schema.type.objectid means id of likes
      ref: "User",                              //ref means reference to user               
    },  
  ],

  comments: [                  //comments of post contains 2 parts  1. user 2. comment
    {
      user: {                               //user of comment                    
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {                          //comment of comment            
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);  //export post schema  