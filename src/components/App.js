import React, {useState} from "react";
import Pnumber from "./Pnumber";

const App = () => {
    const [persons, setPerson] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-23532'},
        {name: 'Dan Abramov', number: '12-43-234234'},
        {name: 'Mary Poppendieck', number: '39-23-124452'}
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
            <div>
                Search by name: <input value={nameFilter} onChange={handleFilter}/>
            </div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value ={newName} onChange={handleNewName}/>
                </div>
                <div>
                    number: <input value ={newNumber} onChange={handleNewNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {
                    filteredNames.map(x => {
                        console.log(x.id,x.name)
                    return(
                    <Pnumber key={x.id} pnumber={x}/>
                    )})
                }
            </ul>
        </div>
    )
}

export default App