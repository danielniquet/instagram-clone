import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  by: {
    type:{},
    required: true
  },
  desc: String,
  photo: String,
  likedBy:{
    type: [],
    default: []
  },
  comments: {
    type: [],
    default: []
  },
  createdAt: {
    type: String,
    default: new Date
  }
})

const postModel = mongoose.model('Post', postSchema)

export default postModel;
