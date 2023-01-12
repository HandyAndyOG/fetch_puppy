import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './FetchPuppy.css'
import { AiOutlineEdit } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import { FaTrashAlt } from 'react-icons/fa';
import { Modal } from './Modal'
import { AddModal } from './AddModal';

interface Puppies {
    id: number;
    name: string;
    breed: string;
    birthDate: string;
}
interface NewPuppy {
    name: string;
    breed: string;
    birthDate: string;
}

const FetchPuppy = () => {
    const [puppies, setPuppies] = useState<Puppies[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [puppyId, setPuppyId] = useState<string>('');
    const [addedPupId, setAddedPupId] = useState<number | null>(null)
    const [selectedPup, setSelectedPup] = useState<number | null>(null)
    const [selectedPupName, setSelectedPupName] = useState<string>('')
    const [selectedPupBreed, setSelectedPupBreed] = useState<string>('')
    const [selectedPupBirth, setSelectedPupBirth] = useState<string>('')
    const [clicked, setClicked] = useState<{ [key:number]:boolean }>({});
    const [deleted, setDeleted] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)

const fetchDoggoById = () => {
    fetch(`http://localhost:8080/api/puppies/${puppyId}`)
        .then(response => response.json())
        .then(data => setPuppies([data]))
        .catch(error => setError(error))
}

const deletePup = (id: number) => {
    if(id) {
        setTimeout(() => {
            fetch(`http://localhost:8080/api/puppies/${id}`, {
                            method: 'DELETE',
                        }).then(() => setDeleted('Delete successfull'))
                        .catch(error => console.log(error))
            setDeleted('');
        }, 200)
    }
}

const editPup = (id: number, name: string, birth: string, breed: string) => {
    setSelectedPupName(name)
    setSelectedPupBreed(breed)
    setSelectedPupBirth(birth)
    setSelectedPup(id)
    setModal(!modal)
    setClicked({ ...clicked, [id]: !clicked[id] });
}

const addPuppy = () => {
    setAddModal(!addModal)
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
}, [puppyId, addedPupId, deleted])

  return (
    <>
    <div className='puppyInput'>
    <label>Filter by id: </label><input value={puppyId} onChange={(event) => setPuppyId(event.target.value)} placeholder='e.g. 1, 2, 3...'/>
    </div>
    <section className='container'>
        <button onClick={addPuppy}>Add</button>
        {puppies ? puppies.map((puppy: Puppies) => <article className="puppy--container" key={uuidv4()}>
            <form>
            <h1>Name: {puppy.name}</h1><span>ID: {puppy.id}</span>
            <p>Breed: {puppy.breed}</p>
            <p>Date of Birth: {puppy.birthDate}</p>
            <span><AiOutlineEdit onClick={() => editPup(puppy.id, puppy.name, puppy.birthDate, puppy.breed)}/></span>
            {<span><FaTrashAlt onClick={() => deletePup(puppy.id)}/></span>}
            </form></article>) : error}
            {modal ? <Modal selectedPup={selectedPup} setAddedPupId={setAddedPupId} setSelectedPup={setSelectedPup} setModal={setModal} selectedPupName={selectedPupName} selectedPupBreed={selectedPupBreed} selectedPupBirth={selectedPupBirth}/> : ''}
    </section>
    {addModal ? <AddModal setAddModal={setAddModal} setAddedPupId={setAddedPupId} /> : ''}
    
    </>
  )
}

export default FetchPuppy


