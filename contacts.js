const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const dataParse = JSON.parse(data);
  return dataParse;
}

async function getContactById(contactId) {
  const getContactsList = await listContacts();
  const getContactById = getContactsList.find(
    (item) => item.id === contactId.toString()
  );
  if (!getContactById) {
    return null;
  }
  return getContactById;
}

async function addContact(name, email, phone) {
  const getContactsList = await listContacts();
  const newContact = { id: shortid.generate(), name, email, phone };
  const updatedContactList = [...getContactsList, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
  return newContact;
}

async function removeContact(contactId) {
  const getContactsList = await listContacts();
  const getContactById = getContactsList.find(
    (item) => item.id === contactId.toString()
  );
  if (!getContactById) {
    return null;
  }
  const contactsList = getContactsList.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
