import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { contactServices } from "../services/contactServices.js";
import ContactCard from "../components/ContactCard.jsx";


// Llamar a componenete contact card  y hacer u map para pintar todoslos contactos
// El boton de añadir contactos va a ser el compomnente link de la libreria React router

export const Home = () => {
  const { store, dispatch } = useGlobalReducer()
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contacts = await contactServices.getAgenda();
        console.log(contacts)
        dispatch({
          type: "set_contacts", payload: contacts.contacts
        });
      } catch (error) {
        console.error(error);
      }
    };
    loadContacts();
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-end mb-4">
        <Link to="/create-contact">
          <button className="btn btn-sucess">
            Add new contact
          </button>
        </Link>
      </div>
      {store.contactList.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};