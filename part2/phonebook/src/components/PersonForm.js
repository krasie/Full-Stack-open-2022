import React from "react";

const PersonFrom = ({persons,newPersons,filter,addPhonebook,handleNewName,handleNewPhone}) =>{
  const personsShow = filter === ''
  ? persons
  : persons.filter(persons => persons.name.indexOf(filter) != -1)
  return (
    <form onSubmit={addPhonebook}>
        <div>
          name: <input value={newPersons.name} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newPersons.phone} onChange={handleNewPhone}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
    </form>
  )
}

export default PersonFrom