const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const resault = contacts.find((item) => item.id === `${contactId}`);

    return resault || null;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === `${contactId}`);
    if (index === -1) {
      return null;
    }
    const [resault] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return resault;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
