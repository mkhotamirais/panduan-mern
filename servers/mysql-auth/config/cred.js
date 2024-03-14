const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3500",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://www.google.com",
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

const corsOptions = {
  origin: (origin, callback) => {
    allowedOrigins.indexOf(origin) !== -1 || !origin ? callback(null, true) : callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = { credentials, corsOptions };
