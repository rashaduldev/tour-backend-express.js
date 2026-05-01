import { User } from "./user.model.js";
const createUser = async (payload) => {
    const { email, password } = payload;
    const user = await User.create({
        email: email,
        password: password
    });
    return user;
};
export const userService = {
    createUser
};
//# sourceMappingURL=user.service.js.map