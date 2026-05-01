import { Router } from "express";
import { userRoutes } from "../user/user.route.js";

export const router = Router();

const AllRoutes=[
    {
        path:"/users",
        route: userRoutes
    }
]

AllRoutes.forEach(({path,route})=>{
    router.use(path,route)
})