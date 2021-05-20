import { Response, Request } from "express";
import { signIn, signUp, mail, googleOauth } from "./user/userHandler";

export default {
  signUp,
  signIn,
  mail,
  googleOauth,
};
