//llamadas de la api crear, editar, eliminar y get (trae todos los contactos)
const API_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "4geeks-user";

export const contactServices = {
    getAgenda: async () => {
        const resp = await fetch (`${API_URL}/agendas/${AGENDA_SLUG}`);
        if (resp.status === 404) {
            await fetch(`${API_URL}/agendas/${AGENDA_SLUG}`, { method: "post" });
            return contactService.getAgenda();
        }
        if (!resp.ok) throw new Error("Error al obtener la agenda");
        return await resp.json();
    },

    getContact: async () => {
        const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);
        if (!resp.ok) throw new Error("Error al obtener los contactos");
        const data = await resp.json();
        return data.contacts()
    },

    createContact: async (contact) => {
        const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`,
            {
                method: "POST",
                headers: { "Content-Type": "application/Json" },
                body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG }),
            });
        if (!resp.ok) throw new Error("Error al crear el contacto");
        return await resp.json();
    },

    updateContact: async (id, contact) => {
        const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/Json" },
                body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG }),
            });
        if (!resp.ok) throw new Error("Error al actualizar contacto");
        return await resp.json();
    },

    deleteContact: async (id) => {
        const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
            { method: "DELETE", });
        if (!resp.ok) throw new Error("Error al eliminar el contacto");
        return true;
    },


}
export default contactServices;