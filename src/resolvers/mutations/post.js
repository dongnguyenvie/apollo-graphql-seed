import { AuthenticationError } from 'apollo-server';

export default {
    createPost: async (parent, { title, content }, { models: { postModel }, me }, info) => {
        if (!me) {
            throw new AuthenticationError('You are not authenticated');
        }
        const post = await postModel.create({ title, content, author: me.id });
        return post;
    }
};