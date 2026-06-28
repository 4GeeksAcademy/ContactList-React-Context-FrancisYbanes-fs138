import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Pencil, Trash2 } from "lucide-react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { contactServices } from "../services/contactServices";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = async () => {
    try {
      await contactServices.deleteContact(contact.id);
      dispatch({ type: "delete_contact", payload: contact.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center border-bottom py-3">
        <img
          src={contact.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
          alt={contact.name}
          className="rounded-circle me-4"
          style={{ width: "90px", height: "90px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h4 className="mb-2">{contact.name}</h4>
          <p className="mb-1 text-secondary d-flex align-items-center gap-2">
            <MapPin size={16} /> {contact.address}
          </p>
          <p className="mb-1 text-secondary d-flex align-items-center gap-2">
            <Phone size={16} /> {contact.phone}
          </p>
          <p className="mb-0 text-secondary d-flex align-items-center gap-2">
            <Mail size={16} /> {contact.email}
          </p>
        </div>
        <div className="d-flex gap-3">
          <Link to={`/edit-contact/${contact.id}`}>
            <Pencil className="contact-icon" />
          </Link>
          <Trash2
            className="contact-icon"
            role="button"
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${contact.id}`}
          />
        </div>
      </div>

      {/* Un modal por contacto, con id único, para que no se confunda con el de otra card */}
      <div className="modal fade" id={`deleteModal-${contact.id}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              If you delete this thing the entire universe will go down!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Oh no!
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleDelete}>
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;