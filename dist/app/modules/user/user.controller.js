import { userService } from "./user.service.js";
const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    });
};
export const userController = {
    createUser
};
//# sourceMappingURL=user.controller.js.map