import { Router, json, urlencoded } from "express";
import { userRouter } from "./usersRouter.js";
import { sessionRouter } from "./sessionRouter.js";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use ("/sessions", sessionRouter)
apiRouter.use ("/users", userRouter)