export const initialStore = () => {
  return {
    contactList: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contactList: action.payload
      };

    case 'add_contact':
      return {
        ...store,
        contactList: [...store.contactList, action.payload]
      };

    case 'update_contact':
      return {
        ...store,
        contactList: store.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case 'delete_contact':
      return {
        ...store,
        contactList: store.contactList.filter((contact) =>
          contact.id !== action.payload
        )
      };

    default:
      throw Error("Unknown action.");
  }
}