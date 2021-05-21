import app from "./server";
import "dotenv/config";

app.set("port", process.env.EX_PORT);
app
  .listen(app.get("port"), () => {
    console.log(`App is listening on PORT ${app.get("port")} `);
  })
  .on("error", (err) => console.error("failed to connect with server")); // 서버 에러시 코드
