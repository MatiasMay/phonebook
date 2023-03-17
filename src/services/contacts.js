import axios from "axios";

const url = 'http://localhost:3001/contactos'

const getContacts = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addContact = newContact => {
    const request = axios.post(url, newContact)
    return request.then(response => response.data)
}

const updateContact = (id,newContact) => {
    const request = axios.put(`${url}/${id}`,newContact)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

export default {getContacts,addContact,updateContact, deleteContact}