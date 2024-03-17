const { sess } = require("./constants");

const sessionOptions = (store) => {
  return {
    secret: sess,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      // false jika http, true jika https, auto jika ingin deteksi otomatis
    },
  };
};

module.exports = { sessionOptions };
