import { Response, Request } from "express";
import { signup, signin, mail } from "./user/userHandler"

export default {
  signup,
  // signin,
  mail,
};