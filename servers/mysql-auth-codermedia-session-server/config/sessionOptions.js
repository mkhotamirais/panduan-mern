const { secret } = require("./constants");

const sessionOptions = (store) => {
  return {
    secret,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      secure: "auto",
      // false jika http, true jika https, auto jika ingin deteksi otomatis
    },
  };
};

module.exports = { sessionOptions };
