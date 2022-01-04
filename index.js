const app = require("./app");
const db = require("./db");

(async () => {
  await db.connect();

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Users app listening on port ${port}!`));
})();
