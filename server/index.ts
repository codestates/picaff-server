import app from "./server"

app.set("port", 3306);
app.listen(app.get("port"), () => {
  console.log(`App is listening on PORT ${app.get("port")} `);
});
