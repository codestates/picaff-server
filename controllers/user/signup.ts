import User from "@entity/User.entity";
import { Response, Request } from "express";
import { getRepository } from "typeorm";

const signup = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const isCheckUser = await userRepository.find({ where: {email: req.body.email }});
    if(isCheckUser.length > 0) { 
      return res.status(401).send({message: "이미 가입되어 있는 이메일 주소입니다."})
    } else if(req.body.email === '' || req.body.email === null) {
      return res.status(404).send({message: "정확한 정보를 입력해 주십시오."})
    } else {
      const user:User = new User();
      user.userName = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      await getRepository(User).save(user)
      res.status(201).send({
        data: { email: user.email, userName: user.userName },
        message: "회원가입이 완료되었습니다." })
    } 
  } catch(e) {
    return res.status(404).send({message: "정확한 정보를 입력해 주십시오."})
  }
}

export default signup;