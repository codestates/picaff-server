import app from "./server";

app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log(`App is listening on PORT ${app.get("port")} `);
});
