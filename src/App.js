import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/personsService'
import Notification from './components/notification'
import ErrorMessage from './components/errorMessage'



const App = (props) => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState('')
    const [message, setNewMessage] = useState(null)
    const [error, setNewError] = useState(null)

    
    let filteredPersons = persons
        .filter(p => p.name
        .toLowerCase()
        .includes(showAll.toLowerCase()));

    useEffect(() => {
        personService.getAll()
          .then(initialNotes => setPersons(initialNotes))
      }, [])
  
    const handleRemove = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Do you really want to delete the person '${person.name}' ?`)) {
            personService.deleteId(id)
              .then(setPersons(persons.filter(p => p.id !== person.id)))
              .catch(error => alert(`the person '${person.name}' does not exist on server`))
    }}

    const addPerson = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName,
            number: newNumber}
        if(persons.find(p => p.name === newName && p.number ===newNumber)){
            alert(`${newName} is already added to phonebook`);
            return;
        }

        if(persons.find(p => p.name === newName)){
            window.confirm(`${newName} is already added to phonebook, replace the number?`)
            const id = persons.find(p => p.name === newName).id;
            personService.update(id, newObject)
                .then(returnedPerson => {
                    const newPersons = [...persons];
                    newPersons[id-1].number = newNumber;
                    setPersons(newPersons)
                    setNewName('')
                    setNewNumber('')
                    setNewMessage(`Changed number of ${newName}`)
                    setTimeout(() => setNewMessage(null), 5000)
                  })
                  .catch(error => {
                    setNewError(`Information of ${newName} has already been removed from the server`)
                    setTimeout(() => setNewError(null), 5000)
                  })
            }
            
        else{
            personService.create(newObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNewMessage(`Added ${newName}`)
                    setTimeout(() => setNewMessage(null), 5000)
                })
                .catch(error => {
                    setNewError(`Error ${error.name}`)
                    setTimeout(() => setNewError(null), 5000)
                })
            }
        }


    const handleFilterChange = (event) => {
    setShowAll(event.target.value)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
                <Notification message={message}/>
                <ErrorMessage error={error}/>
                <Filter handleFilterChange = {handleFilterChange}/>
            <h2>Add a new</h2>
                <PersonForm 
                    addPerson={addPerson}
                    newName = {newName}
                    handleNameChange = {handleNameChange}handleRemove
                    newNumber = {newNumber}
                    handleNumberChange = {handleNumberChange}
                />
            <h2>Numbers</h2>
                {filteredPersons.map(p => 
                <Persons 
                    key={p.id} 
                    name={p.name} 
                    number={p.number} 
                    handleClick={() => handleRemove(p.id)}
                />)}
        </div>
    )
}

export default App
