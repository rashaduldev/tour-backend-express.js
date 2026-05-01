/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (payload: Partial<IUser>) => {
    
    const {email,name} = payload;
    const user = await User.create({
        email: email!,
        name: name!
    })
    return user;
}

export const userService = {
    createUser
}