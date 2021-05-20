import { Response, Request } from "express";
import { signup, signin, mail, signout } from "./user/userHandler"

export default {
  signup,
  signin,
  mail,
  // signout
};