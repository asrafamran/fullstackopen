import { useState, useEffect } from "react";

import personService from "./services/persons";

const Filter = ({ setSearch }) => {
  return (
    <div>
      filter shown with <input onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

const PersonForm = ({ handleName, handleNumber, AddName }) => {
  return (
    <form>
      <div>
        name: <input onChange={(e) => handleName(e)} />
      </div>
      <div>
        number: <input onChange={(e) => handleNumber(e)} />
      </div>
      <div>
        <button type="submit" onClick={(e) => AddName(e)}>
          add
        </button>
      </div>
    </form>
  );
};

const Notification = ({ name, error }) => {
  if (name === null) {
    return null;
  }

  if (error) {
    return (
      <div className="border-delete">
        <h2 className="text_error">
          Information of {name} has already been removed from server
        </h2>
      </div>
    );
  }

  return (
    <div className="border_added">
      <h2 className="text_added">Added {name}</h2>
    </div>
  );
};

const Person = ({ persons, search, setPersons, setName }) => {
  const handleDelete = (person, id) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.delete(id);
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
      setName(null);
    }
  };

  return (
    <>
      {persons
        .filter((person) => {
          return search.toLowerCase() === ""
            ? person
            : person.name.toLowerCase().includes(search);
        })
        .map((person) => (
          <div key={person.id}>
            <p>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person, person.id)}>
                delete
              </button>
            </p>
          </div>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(persons.concat(res.data)));
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const AddName = (e) => {
    e.preventDefault();
    let data = {
      id: persons.length + 1,
      name: newName,
      number: number,
    };

    if (!persons.find((person) => person.name === newName)) {
      setError(false);
      setName(newName);
      personService.create(data);
      setPersons(persons.concat(data));
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = persons.find((p) => p.name === newName);
        const changedPerson = { ...newPerson, number: number };
        personService
          .update(newPerson.id, changedPerson)
          .then(() => {
            const updatedPersons = persons.map((p) => {
              if (newPerson.id == p.id) {
                return { ...p, number: number };
              }
              return p;
            });
            setPersons(updatedPersons);
          })
          .catch((e) => {
            console.log();
            const newPersons = persons.filter((person) => person.id !== newPerson.id);
            setPersons(newPersons);
            setName(newName);
            setError(true);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={name} error={error} />
      <Filter setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        AddName={AddName}
      />
      <h2>Numbers</h2>
      <Person
        persons={persons}
        search={search}
        setPersons={setPersons}
        setName={setName}
      />
    </div>
  );
};

export default App;
