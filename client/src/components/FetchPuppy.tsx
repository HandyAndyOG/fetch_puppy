import { setDefaultResultOrder } from 'dns'
import React, { useState } from 'react'
import './FetchPuppy.css'

interface Puppies {
    id: number;
    name: string;
    breed: string;
    birthDate: string;
}

const FetchPuppy = () => {
    const [puppies, setPuppies] = useState<Puppies[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchDoggos = () => {
        fetch('http://localhost:8080/api/puppies/')
            .then(response => response.json())
            .then(data => setPuppies(data))
            .catch(error => setError(error))
    }
  return (
    <section className='container'>
        <button onClick={fetchDoggos} >Fetch All the pupps!</button>
        {puppies ? puppies.map((puppy: Puppies) => <article className="puppy--container" key={puppy.id}>
            <h1>Name: {puppy.name}</h1>
            <p>Breed: {puppy.breed}</p>
            <p>Date of Birth: {puppy.birthDate}</p>
        </article>) : null}
    </section>
  )
}

export default FetchPuppy