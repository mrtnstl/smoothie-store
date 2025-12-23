const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: false,
};
module.exports = cors(corsOptions);
