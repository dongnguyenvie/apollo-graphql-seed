export default {
    Post: {
        author: async ({ author }, args, { models: { userModel } }, info) => {
            const user = await userModel.findById({ _id: author }).exec();
            return user;
        },
    },
}