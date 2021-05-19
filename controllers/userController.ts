import { Response, Request } from "express";
import { signup, mail } from "./user/userHandler";

export default {
  signup,
  // signin,
  mail,
};
