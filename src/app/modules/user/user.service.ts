/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (payload: Partial<IUser>) => {
    const {email,password} = payload;
    const user = await User.create({
        email: email!,
        password: password!
    })
    return user;
}

export const userService = {
    createUser
}