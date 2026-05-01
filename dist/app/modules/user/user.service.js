import { User } from "./user.model.js";
const createUser = async (payload) => {
    const { email, name } = payload;
    const user = await User.create({
        email: email,
        name: name
    });
    return user;
};
export const userService = {
    createUser
};
//# sourceMappingURL=user.service.js.map