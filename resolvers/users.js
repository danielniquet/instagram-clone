import bcrypt from 'bcrypt';

export default {
  Query: {
    allUsers: (parent, args, {models}) => models.User.find(),
    getUser: (parent, args, {models}) => models.User.findOne(args)
  },
  Mutation: {
    createUser: async (parent, {password, ...args}, {models}) => {
      // return models.User.create(args)
      try{
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await models.User.create({...args, password: hashPassword})
        return user && user._id;
      }catch(error){
        return false;
      }
    }
  }
}
