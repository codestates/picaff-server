// import User from "../src/entity/User.entity";
// import jwt from "jsonwebtoken";
// import "dotenv/config";
// import { google, drive_v3, Auth, Common } from "googleapis";
// import express, { Request, Response } from "express";
// import app from "../server/server";

// let googleClient = require("./config/google2.json");
// const googleConfig = {
//   clientId: googleClient.web.client_id,
//   clientSecret: googleClient.web.client_secret,
//   redirect: googleClient.web.redirect_uris[1],
// };
// const scopes = ["email", "profile", "openid"];
// const oauth2Client = new google.auth.OAuth2(
//   googleConfig.clientId,
//   googleConfig.clientSecret,
//   googleConfig.redirect
// );
// const url = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: scopes,
// });

// function getGooglePlusApi(auth) {
//   return google.plus({ version: "v1", auth });
// }

// async function googleLogin(code) {
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   oauth2Client.on("tokens", (token) => {
//     if (tokens.refresh_token) {
//       console.log("Refresh token: ", tokens.refresh_token);
//     }
//     console.log("Access token: ", tokens.access_token);
//   });
//   const plus = getGooglePlusApi(oauth2Client);
//   const res = await plus.people.get({ userId: "me" });
//   console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
//   return res.data.displayName;
// }

// app.get("/login", function (req: Request, res: Response) {
//   res.redirect(url);
// });

// app.get("/auth/google/callback", async function (req, res) {
//   const displayName = await googleLogin(req.query.code);
//   console.log(displayName);

//   res.redirect("http://localhost:4000");
// });

// ~
// module.exports = async (req, res) => {
//   const picaffClientCallbackUrl = "http://localhost:4000/auth/google/callback";

//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_PWD,
//     picaffClientCallbackUrl
//   );

//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     // prompt: "consent",
//     scope: ["email", "profile", "openid"],
//   });

//   function getGoogleApi

//   let auth = false;
//   app.get("/google", async function (req: Request, res: Response) {
//     if (auth) {
//       let userInfo;
//     }
//   });

//   app.get(
//     "/auth/google/callback",
//     async function (req: Request, res: Response) {
//       const code = req.query.code;
//       if (code) {
//         const { tokens } = await oauth2client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         auth = true;
//       }
//       res.redirect("/");
//     }
//   );
// };
