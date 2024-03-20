const allowedOrigins = [
  "https://www.yoursite.com",
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) res.header("Access-Control-Allow-Credentials", true);
  next();
};

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { credentials, corsOptions };
