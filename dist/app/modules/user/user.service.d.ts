import type { IUser } from "./user.interface.js";
export declare const userService: {
    createUser: (payload: Partial<IUser>) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map