import nodemail from 'nodemailer'
import dotenv from 'dotenv'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

dotenv.config()
const makeSerial = (): string => {
  let number = Math.floor(Math.random() * 1000000) + 100000
  if (number > 1000000) {
    number = number - 100000
  }
  return number.toString()
}

const mail = async (req: Request, res: Response) => {
  const { email } = req.body
  const isExistEmail = await interfaces.isCheckedUser(email)
  if (isExistEmail) return res.status(403).send({ message: '이미 사용중인 메일주소입니다.' })

  //이미 존재하는 메일 여부 체크 유저정보에서 확인해서 예외처리
  const serialnum = makeSerial()
  let transporter = nodemail.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: 'picaffAuth@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: '"Picaff 당신의 커피 취향을 알아보세요" <PicaffAuth@gamil.com>',
    to: `${email}`,
    subject: '[Picaff] email 인증요청',
    html: `
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" bgcolor="#F7F7F4" >
      <img src="cid:logo1.png" alt="Creating Email Magic" width="100%" style="display: block;" />
    </td>
    </tr>
    <tr>
    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
      인증번호: <p style="font-color:#0B421A;">${serialnum}</p>
    </td>
    </tr>
    </table>
    `,
    attachments: [
      {
        filename: 'logo1.png',
        path: __dirname + '/logo1.png',
        cid: 'logo1.png',
      },
    ],
  })

  return res.status(201).send({ serialnum })
}

export default mail
