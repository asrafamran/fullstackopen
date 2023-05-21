import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleName = (e) => {
    setNewName({ name: e.target.value });
  };

  const AddName = (e) => {
    e.preventDefault();

    if (!persons.find((person) => person.name === newName.name)) {
      console.log(newName);
      setPersons(persons.concat(newName));
    } else {
      alert(`${newName.name} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(e) => handleName(e)} />
        </div>
        <div>
          <button type="submit" onClick={(e) => AddName(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
