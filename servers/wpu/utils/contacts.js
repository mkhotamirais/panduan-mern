const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]", "utf-8");

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const findContact = (id) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
};

const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
};

const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

const deleteContact = (id) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.id !== id);
  saveContact(filteredContacts);
};

const updateContact = (contactBaru) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContact(filteredContacts);
};

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact };
