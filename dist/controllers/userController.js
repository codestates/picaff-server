"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const makeSerial = () => {
    let number = Math.floor(Math.random() * 1000000) + 100000;
    if (number > 1000000) {
        number = number - 100000;
    }
    return number.toString();
};
exports.default = {
    get: (req, res) => { },
    mail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const serialnum = makeSerial();
        let transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            port: 587,
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
                user: "picaffAuth@gmail.com",
                pass: process.env.MAIL_PASSWORD,
            },
        });
        yield transporter.sendMail({
            from: '"Picaff 당신의 커피 취향을 알아보세요" <PicaffAuth@gamil.com>',
            to: `${email}`,
            subject: "[Picaff] email 인증요청",
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
                    filename: "logo1.png",
                    path: __dirname + "/logo1.png",
                    cid: "logo1.png",
                },
            ],
        });
        res.status(201).send({ serialnum });
    }),
};
//# sourceMappingURL=userController.js.map