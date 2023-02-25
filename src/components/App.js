import React, {useState} from "react";
import Filterer from "./Filterer";
import PersonForm from "./PersonForm";
import ContactList from "./ContactList";
import Pnumber from "./Pnumber";

const App = () => {
    const [persons, setPerson] = useState([
        {name: 'Arto Hellas', number: '040-123456', id:1},
        {name: 'Ada Lovelace', number: '39-44-23532', id:2},
        {name: 'Dan Abramov', number: '12-43-234234', id:3},
        {name: 'Mary Poppendieck', number: '39-23-124452', id:4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber,setNewNumber] = useState('')
    const [nameFilter,setNameFilter] = useState('')
    const addPerson = (event) => {
        event.preventDefault()
        const numObject = {
            name: newName,
            number: newNumber,
            id: persons.length +1
        }
        persons.some(x => x.name.toLocaleLowerCase()===numObject.name.toLocaleLowerCase()) ? alert(numObject.name + ' is already added to the phonebook') : setPerson(persons.concat(numObject))
        setNewName('')
        setNewNumber('')
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
            <Filterer nameFilter = {nameFilter} handleFilter={handleFilter}/>
            <h3>Add a new</h3>
            <PersonForm addPerson = {addPerson} newName = {newName} handleNewName = {handleNewName} newNumber = {newNumber} handleNewNumber = {handleNewNumber}/>
            <h3>Numbers</h3>
            <ContactList filteredNames={filteredNames}/>
        </div>
    )
}

export default App