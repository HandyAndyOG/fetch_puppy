import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './FetchPuppy.css'
import AddPuppy from './AddPuppy'

interface Puppies {
    id: number;
    name: string;
    breed: string;
    birthDate: string;
}

const FetchPuppy = () => {
    const [puppies, setPuppies] = useState<Puppies[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [puppyId, setPuppyId] = useState<string>('');
    const [newPup, setNewPup] = useState<boolean>(false)

const fetchDoggoById = () => {
    fetch(`http://localhost:8080/api/puppies/${puppyId}`)
        .then(response => response.json())
        .then(data => setPuppies([data]))
        .catch(error => setError(error))
}
const onToggle = (value: boolean) => setNewPup(value);


useEffect(() => {
    const fetchDoggos = () => {
        fetch('http://localhost:8080/api/puppies/')
            .then(response => response.json())
            .then(data => setPuppies(data))
            .catch(error => setError(error))
    }
    fetchDoggos()
    if(puppyId.length > 0) {
        fetchDoggoById();
    }
}, [puppyId, newPup])

  return (
    <>
    <div className='puppyInput'>
    <label>Filter by id: </label><input value={puppyId} onChange={(event) => setPuppyId(event.target.value)} placeholder='e.g. 1, 2, 3...'/>
    </div>
    <section className='container'>
        {puppies ? puppies.map((puppy: Puppies) => <article className="puppy--container" key={uuidv4()}>
            <h1>Name: {puppy.name}</h1><span>ID: {puppy.id}</span>
            <p>Breed: {puppy.breed}</p>
            <p>Date of Birth: {puppy.birthDate}</p>
        </article>) : error}
    </section>
    <AddPuppy prop={onToggle} newPup={newPup}/>
    </>
  )
}

export default FetchPuppy