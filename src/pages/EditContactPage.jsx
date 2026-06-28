import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function EditContactPage() {
  const { id } = useParams();
  const { store } = useGlobalReducer();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const found = store.contactList.find((c) => c.id === Number(id));
    setContact(found);
  }, [id, store.contactList]);

  if (!contact) return <p className="text-center mt-5">Loading...</p>;

  return <ContactForm contact={contact} />;
}