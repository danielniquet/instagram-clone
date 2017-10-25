export default {
  Query: {
    getPost: (parent, args, {models}) => models.Post.findOne(args)
  },
  Mutation: {
    createPost: (parent, args, {models, user}) => models.Post.create({...args.post, by: user})
  }
}
