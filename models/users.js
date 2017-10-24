import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "El campo usuario es requerido"]
  },
  password: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel;
