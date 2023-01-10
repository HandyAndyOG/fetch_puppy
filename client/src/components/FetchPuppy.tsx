import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './FetchPuppy.css'
import AddPuppy from './AddPuppy'
import { AiOutlineEdit } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import { FaTrashAlt } from 'react-icons/fa';

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
    const [addedPupId, setAddedPupId] = useState<number | null>(null)
    const [changeName, setChangeName] = useState<string>()
    const [changeBreed, setChangeBreed] = useState<string>('')
    const [changeBirthDate, setChangeBirthDate] = useState<string>('')
    const [clicked, setClicked] = useState<{ [key:number]:boolean }>({});
    const [deleted, setDeleted] = useState<string>('');

const fetchDoggoById = () => {
    fetch(`http://localhost:8080/api/puppies/${puppyId}`)
        .then(response => response.json())
        .then(data => setPuppies([data]))
        .catch(error => setError(error))
}

const deletePup = (id: number) => {
    console.log(id)
    if(id) {
        setTimeout(() => {

            fetch(`http://localhost:8080/api/puppies/${id}`, {
                            method: 'DELETE',
                        }).then(() => setDeleted('Delete successfull'))
                        .catch(error => console.log(error))
            setDeleted('');
        }, 1000)
    }
}

const editPup = (id: number) => {
    setClicked({ ...clicked, [id]: !clicked[id] });
}

const handleEditPup = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setClicked({ ...clicked, [id]: !clicked[id] });
    fetch(`http://localhost:8080/api/puppies/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({name: changeName, breed: changeBreed, birthDate: changeBirthDate})
                }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
    setChangeName('');
    setChangeBirthDate('');
    setChangeBreed('');
    setNewPup(!newPup);
}

useEffect(() => {
    
    const fetchDoggos = () => {
        fetch('http://localhost:8080/api/puppies/')
            .then(response => response.json())
            .then(data => setPuppies(data.data.puppies))
            .catch(error => setError(error))
    }
    fetchDoggos()
    if(puppyId.length > 0) {
        fetchDoggoById();
    }
    setAddedPupId(null);
}, [puppyId, newPup, addedPupId, deleted])

  return (
    <>
    <div className='puppyInput'>
    <label>Filter by id: </label><input value={puppyId} onChange={(event) => setPuppyId(event.target.value)} placeholder='e.g. 1, 2, 3...'/>
    </div>
    <section className='container'>
        {puppies ? puppies.map((puppy: Puppies) => <article className="puppy--container" key={uuidv4()}>
            <form onSubmit={(e) => handleEditPup(e, puppy.id)}>
            <h1>Name: {clicked[puppy.id] ? <input value={changeName} onChange={(e) => setChangeName(e.target.value)}/> : puppy.name}</h1><span>ID: {puppy.id}</span>
            <p>Breed: {clicked[puppy.id]  ? <input value={changeBreed} onChange={(e) => setChangeBreed(e.target.value)}/> : puppy.breed}</p>
            <p>Date of Birth: {clicked[puppy.id] ? <input value={changeBirthDate} onChange={(e) => setChangeBirthDate(e.target.value)}/> : puppy.birthDate}</p>
            {clicked[puppy.id]  ? <button><GiCheckMark type="submit"/></button> : <span><AiOutlineEdit onClick={() => editPup(puppy.id)}/></span>}
            {<span><FaTrashAlt onClick={() => deletePup(puppy.id)}/></span>}
            </form></article>) : error}
    </section>
    <AddPuppy setAddedPupId={setAddedPupId} />
    </>
  )
}

export default FetchPuppy


