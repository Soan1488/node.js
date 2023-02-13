const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((elem) => contactId === Number(elem.id));
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (elem) => Number(elem.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), "utf-8");
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    contacts.push({ id: shortid.generate(), name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
