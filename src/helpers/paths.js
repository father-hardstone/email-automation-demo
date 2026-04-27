const path = require("node:path");

function rootPath(...parts) {
  return path.join(process.cwd(), ...parts);
}

module.exports = { rootPath };

