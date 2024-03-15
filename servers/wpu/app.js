const express = require("express");
const { port } = require("./config/constants");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require("./utils/contacts");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "home" });
});

app.get("/mahasiswa", (req, res) => {
  const mahasiswa = [
    { id: "1", nama: "ahmad", umur: 21 },
    { id: "2", nama: "abdul", umur: 22 },
    { id: "3", nama: "siti", umur: 23 },
  ];
  const dosen = [
    // {id: "1", nama: "dosen1", umur: 51},
    // {id: "2", nama: "dosen2", umur: 52}
  ];
  res.render("mahasiswa", { title: "mahasiswa", mahasiswa, dosen });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "contact" });
});

// ------- coba denga express-ejs-layout
app.use(expressLayouts);

app.get("/ejs-layout-home", (req, res) => {
  res.render("ejs-layout-home", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-home",
  });
});
app.get("/ejs-layout-about", (req, res) => {
  res.render("ejs-layout-about", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-about",
  });
});

app.get("/ejs-layout-contact", (req, res) => {
  const contacts = loadContact();
  res.render("ejs-layout-contact", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-contact",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/ejs-layout-contact/detail/:id", (req, res) => {
  const contact = findContact(req.params.id);
  res.render("ejs-layout-detail", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-detail",
    contact,
  });
});

app.get("/ejs-layout-contact/add", (req, res) => {
  const contact = findContact(req.params.id);
  res.render("ejs-layout-add", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-add",
    contact,
  });
});

app.post(
  "/ejs-layout-contact/add",
  [
    body("nama").custom((value) => {
      const duplicate = cekDuplikat(value);
      if (duplicate) throw new Error("Nama kontak sudah digunakan");
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHp", "No hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("ejs-layout-add", {
        layout: "ejs-layout-main",
        title: "halaman ejs-layout-add",
        errors: errors.array(),
      });
    }
    const payload = req.body;
    payload.id = uuidv4();
    addContact(req.body);
    req.flash("msg", "data kontak berhasil ditambahkan ");
    res.redirect("/ejs-layout-contact");
  }
);

app.get("/ejs-layout-contact/delete/:id", (req, res) => {
  const contact = findContact(req.params.id);
  if (!contact) return res.status(404).send("<h1>404</h1>");
  deleteContact(req.params.id);
  req.flash("msg", "data kontak berhasil dihapus");
  res.redirect("/ejs-layout-contact");
});

app.get("/ejs-layout-contact/edit/:id", (req, res) => {
  const contact = findContact(req.params.id);
  res.render("ejs-layout-edit", {
    layout: "ejs-layout-main",
    title: "halaman ejs-layout-edit",
    contact,
  });
});

app.post(
  "/ejs-layout-contact/edit",
  [
    body("nama").custom((value, { req }) => {
      const duplicate = cekDuplikat(value);
      if (value !== req.body.oldNama && duplicate) throw new Error("Nama kontak sudah digunakan");
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHp", "No hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("ejs-layout-edit", {
        layout: "ejs-layout-main",
        title: "halaman ejs-layout-edit",
        errors: errors.array(),
        contact: req.body,
      });
    }
    updateContact(req.body);
    req.flash("msg", "data kontak berhasil diubah");
    res.redirect("/ejs-layout-contact");
  }
);

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => console.log(`App is listening to port ${port}`));
