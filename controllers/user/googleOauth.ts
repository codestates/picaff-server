import User from "../../src/entity/User.entity";
import token from "@middleware/jwt";
import "dotenv/config";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

const { OAuth2Client } = require("google-auth-library");

const googleOauth = async (req: Request, res: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const userRepository = getRepository(User);
  async function verify() {
    console.log("Veryfing your token....");
    const ticket = await client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload["email"];
    const userName = payload["name"];
    const password = payload["sub"]; // 114431990724931021242 // 21자리의 Google 회원 id 번호

    if (payload.email_verified === true) {
      const checkUser = await userRepository.find({ where: { email: email } });
      if (checkUser.length > 0) {
        console.log("this user exists in DB: ", email);
        const checkPassword = await (checkUser[0].password === password);
        if (checkPassword) {
          const accessToken = token.generateAccessToken(
            checkUser[0]!.id,
            checkUser[0]!.email,
            checkUser[0]!.userName
          );
          const refreshToken = token.generateRefreshToken(
            checkUser[0]!.id,
            checkUser[0]!.email,
            checkUser[0]!.userName
          );

          res
            .status(200)
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .send({
              data: {
                id: checkUser[0]!.id,
                userName: checkUser[0]!.userName,
                email: checkUser[0]!.email,
                auth: {
                  accessToken: accessToken,
                },
              },
              message: "로그인에 성공하였습니다.",
            });
        } else {
          res.status(404).send("로그인에 실패하였습니다.");
        }
      } else {
        console.log("writing the userInfo in DB....");
        const user: User = new User();
        user.userName = userName;
        user.email = email;
        user.password = password;
        await userRepository.save(user);

        const userInfo = await userRepository.findOne({
          where: { email: email },
        });
        const accessToken = token.generateAccessToken(
          userInfo!.id,
          userInfo!.email,
          userInfo!.userName
        );
        const refreshToken = token.generateRefreshToken(
          userInfo!.id,
          userInfo!.email,
          userInfo!.userName
        );

        res
          .status(201)
          .cookie("refreshToken", refreshToken, { httpOnly: true })
          .send({
            data: {
              id: userInfo!.id,
              userName: userInfo!.userName,
              email: userInfo!.email,
              auth: {
                accessToken: accessToken,
              },
            },
            message: "회원가입 후 로그인에 성공하였습니다.",
          });
      }
    }
  }
  verify().catch(console.error);
};

export default googleOauth;
