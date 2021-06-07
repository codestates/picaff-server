import User from "@entity/User.entity";
import token from "@middleware/jwt";
import { Response, Request } from "express";
import { getRepository } from "typeorm";

const signIn = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const userInfo = await userRepository.findOne({
      where: { email: req.body.email },
    });
    const isCheckedPassword = await (userInfo!.password === req.body.password);
    if (isCheckedPassword && req.body.email !== "" && req.body.email !== null) {
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

      return res
        .status(200)
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
          message: "로그인에 성공하였습니다.",
        });
    } else {
      return res
        .status(404)
        .send({ message: "아이디와 비밀번호를 확인해주세요." });
    }
  } catch (e) {
    return res
      .status(404)
      .send({ message: "아이디와 비밀번호를 확인해주세요." });
  }
};

export default signIn;
