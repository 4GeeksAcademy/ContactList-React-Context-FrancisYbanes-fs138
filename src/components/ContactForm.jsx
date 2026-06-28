// Este componente se tendrá que llamar en la edicion y creacion de contact page
//En Create Contact el formulario está vacío. Por lo tanto sus estados tendrásn u valor inicial de string vacío. 
// En Edit Contact el formulario viene con low datos del contacto. Por lo tanto los estados asociados a los inputs su valor inicial serán los valores del contacto.
// Por lo tanto el campo de formulario tendrás un propiedada que sea contact que nos lleva a "undefined " en el formlario de creación y con valor en el formulario de edición.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { contactServices } from "../services/contactServices";

const ContactForm = ({ contact }) => {
      const navigate = useNavigate();
      const { dispatch } = useGlobalReducer();
      console.log(contact)
      const [name, setName] = useState(contact ? contact.name : "");
      const [email, setEmail] = useState(contact ? contact.email : "");
      const [phone, setPhone] = useState(contact ? contact.phone : "");
      const [address, setAddress] = useState(contact ? contact.address : "");

      const handleSubmit = async (e) => {
            e.preventDefault();
            const contactData = { name, email, phone, address };

            try {
                  if (contact) {
                        const updated = await contactServices.updateContact(contact.id, contactData);
                        dispatch({ type: "update_contact", payload: updated });
                  } else {
                        const created = await contactServices.createContact(contactData);
                        dispatch({ type: "add_contact", payload: created });
                  }
                  navigate("/");
            } catch (error) {
                  console.error(error);
            }
      };

      return (
            <form className="container mt-5" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">{contact ? "Edit contact" : "Add a new contact"}</h1>

                  <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div className="mb-4">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">save</button>
                  <p className="text-center mt-3">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                              or get back to contacts
                        </a>
                  </p>
            </form>
      );
};

export default ContactForm;