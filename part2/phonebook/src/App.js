import { useState } from "react";

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

const Person = ({ persons, search }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return search.toLowerCase() === ""
            ? person
            : person.name.toLowerCase().includes(search);
        })
        .map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState(null);
  const [search, setSearch] = useState("");

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const AddName = (e) => {
    e.preventDefault();
    let data = {
      name: newName,
      number: number,
    };

    if (!persons.find((person) => person.name === newName)) {
      setPersons(persons.concat(data));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        AddName={AddName}
      />
      <h2>Numbers</h2>
      <Person persons={persons} search={search} />
    </div>
  );
};

export default App;
