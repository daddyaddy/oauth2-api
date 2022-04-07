import "./src/utils";
import database from "./src/modules/database";
import app from "./src/bin/app";

const main = async () => {
  global.log(`Running server in environment: ${process.env.NODE_ENV}`);
  await database.run();
  await app.run();

  const PORT = 6060;
  app.app.listen(process.env.PORT || PORT, function () {
    global.log(`Server listening on port: ${this.address().port}`);
  });
};

main();
