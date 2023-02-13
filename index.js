const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table).catch(console.log);
      break;

    case "get":
      getContactById(id).then(console.log).catch(console.log);
      break;

    case "add":
      addContact(name, email, phone)
        .then(console.log("Success, you added contact"))
        .catch(console.log);
      break;

    case "remove":
      removeContact(id)
        .then(console.log("Success, you deleted contact"))
        .catch(console.log);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
