import User from "../src/entity/User.entity";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { google } from "googleapis";
import express, { Request, Response } from "express";

import app from "../server/server";
// import SocialProfileInterface from "@interface/socialProfile.interface";

// "/api/v1/auth/token",
export default {
  get: async (req: Request, res: Response) => {
    // const jsonwebtoken = jwt.verify(req.query.claim, public key) as IAccessTokenRequest; // accesstoken
    // 토큰받기.
  },
};
