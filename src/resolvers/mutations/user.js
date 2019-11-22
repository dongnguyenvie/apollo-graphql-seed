
export default {
    createUser: async (parent, { name, password }, { models: { userModel } }, info) => {
        const user = await userModel.create({ name, password });
        return user;
    },
};