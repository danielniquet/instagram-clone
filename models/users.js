import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "El campo usuario es requerido"]
  },
  password: String,
  desc: String,
  bio: String,
  email: String,
  thumbnail: "String",
  posts: {
    type: [],
    default: []
  },
  following: {
    type: [],
    default: []
  },
  followers: {
    type: [],
    default: []
  }
})

const userModel = mongoose.model('User', userSchema)

export default userModel;
