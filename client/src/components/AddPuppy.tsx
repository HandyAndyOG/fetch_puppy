import React, { useState } from 'react'
import './AddPuppy.css'

interface Prop {
  setAddedPupId: (value: number) => void;
  setAddModal: (value: boolean) => void;
}

const AddPuppy: React.FC<Prop> = ({ setAddedPupId, setAddModal }) => {
    const [pupName, setPupName] = useState<string>('')
    const [pupBreed, setPupBreed] = useState<string>('')
    const [pupBirth, setPupBirth] = useState<string>('')

const handleNewPup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(pupName && pupBreed && pupBirth) {
      fetch('http://localhost:8080/api/puppies/', {
                      method: 'POST',
                      headers: {
                          'Content-type' : 'application/json'
                      },
                      body: JSON.stringify({name: pupName, breed: pupBreed, birthDate: pupBirth})
                  }).then(response => response.json())
                  .then(data => setAddedPupId(Number(data.id)))
                  .catch(error => console.log(error))
      setPupName('');
      setPupBirth('');
      setPupBreed('');
      setAddModal(false)
    }
}

  return (
    <>
    <h2 className='form_h2'>Add a new Pup!</h2>
    <form className='form--container' onSubmit={handleNewPup}>
        <label>Name: </label>
        <input placeholder='e.g. Floof..' value={pupName} onChange={(e) => setPupName(e.target.value)}/>
        <label>Breed: </label>
        <input placeholder='e.g. Labrador..' value={pupBreed} onChange={(e) => setPupBreed(e.target.value)}/>
        <label>Date of Birth: </label>
        <input placeholder='e.g. 2001/04/20 ..'value={pupBirth} onChange={(e) => setPupBirth(e.target.value)}/>
        <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default AddPuppy