const express = require("express");

const { router } = require("./routes");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

function createApp() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.get("/", (req, res) => {
    res
      .status(200)
      .type("html")
      .send(
        [
          "<!doctype html>",
          '<html lang="en">',
          "<head>",
          '  <meta charset="utf-8" />',
          '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
          "  <title>Email Automation Demo</title>",
          "</head>",
          "<body>",
          "  <h1>Welcome to email automation demo</h1>",
          "  <p>Try <code>/generate-email</code> or <code>/generate-email-from-apollo</code>.</p>",
          "</body>",
          "</html>",
        ].join("\n"),
      );
  });
  app.get("/favicon.ico", (req, res) => res.status(204).end());
  app.use(router);
  app.use(errorMiddleware);
  return app;
}

function handler(req, res) {
  const app = createApp();
  return app(req, res);
}

module.exports = handler;
module.exports.createApp = createApp;

