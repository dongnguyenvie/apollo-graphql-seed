export default {
    post: async (parent, { id }, { models: { postModel }, me }, info) => {
        if (!me) {
          throw new AuthenticationError('You are not authenticated');
        }
        const post = await postModel.findById({ _id: id }).exec();
        return post;
      },
      posts: async (parent, args, { models: { postModel }, me }, info) => {
        if (!me) {
          throw new AuthenticationError('You are not authenticated');
        }
        const posts = await postModel.find({ author: me.id }).exec();
        return posts;
      },
}