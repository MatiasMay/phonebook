import React, {useState,useEffect} from "react";
import Filterer from "./Filterer";
import PersonForm from "./PersonForm";
import ContactList from "./ContactList";
import axios from "axios";
import contactServices from '../services/contacts'
import ErrorNotification from "./notification";

const App = () => {
    const [persons, setPerson] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber,setNewNumber] = useState('')
    const [nameFilter,setNameFilter] = useState('')
    const [message,setMessage] = useState(null)
    const [messageType,setMessageType] = useState(1)
    useEffect(() => {
        contactServices
            .getContacts()
            .then(response => setPerson(response))
    },[])
    const addPerson = (event) => {
        event.preventDefault()
        const numObject = {
            name: newName,
            number: newNumber
        }
        persons.some(x => x.name.toLocaleLowerCase()===numObject.name.toLocaleLowerCase()) 
            ? updatePerson(numObject)
            : contactServices.addContact(numObject).then(
                response => {
                    setPerson(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                    setMessageType(2)
                    setMessage(`Added ${numObject.name}`)
                    setTimeout(()=>{
                        setMessage(null)
                    }, 5000)
                })
    }


    
    const updatePerson = (contact) => {
        if (window.confirm(`${contact.name} is already added to the phonebook. Replace the old number with the new one?`) == true){
        const person = persons.find(x => x.name === contact.name)
        const person2 = {...person, number: contact.number}
        contactServices
          .updateContact(person.id,person2)
          .then(response => {
            setPerson(persons.map(x => x.id != person2.id ? x: response))
            setMessageType(2)
            setMessage(`Updated ${person2.name}`)
            setTimeout(()=>{
                setMessage(null)
              }, 5000)
            })
          .catch(error => {
            setMessageType(1)
            setMessage(`Information from ${person2.name} was already deleted from server`)
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
            setPerson(persons.filter(x=>x.id != person.id))
        })
        }   
    }
    const deletePerson = (contact) => {
        if (window.confirm(`Delete ${contact.name}?`)){
            contactServices
                .deleteContact(contact.id)
                .then(
                    setPerson(persons.filter(x => x.name != contact.name))
                ).catch(error=>{
                    setMessageType(1)
                    setMessage(`Information from ${contact.name} was already deleted from server`)
                    setTimeout(()=>{
                        setMessage(null)
                    }, 5000)
                    setPerson(persons.filter(x=>x.id != contact.id))
                })
        }
    }
    const handleNewName = (event) => {
        setNewName(event.target.value)
    }
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilter = (event) => {
        setNameFilter(event.target.value)
    }
    const filteredNames = persons.filter(x => x.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()))
    return(
        <div>
            <h2>Phonebook</h2>
            <ErrorNotification message={message} messageType={messageType}/>
            <Filterer nameFilter = {nameFilter} handleFilter={handleFilter}/>
            <h3>Add a new</h3>
            <PersonForm addPerson = {addPerson} newName = {newName} handleNewName = {handleNewName} newNumber = {newNumber} handleNewNumber = {handleNewNumber}/>
            <h3>Numbers</h3>
            <ContactList filteredNames={filteredNames} deleteNumber={deletePerson}/>
        </div>
    )
}

export default App