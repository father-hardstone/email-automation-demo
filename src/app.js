const express = require("express");

const { router } = require("./routes");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

function createApp() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.use(router);
  app.use(errorMiddleware);
  return app;
}

module.exports = { createApp };

