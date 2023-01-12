import React, {useState} from 'react'

interface SelectedPup {
    selectedPup: number | null;
    setSelectedPup: (value: number | null) => void;
    setAddedPupId: (value: number) => void;
    setModal: (value: boolean) => void;
    selectedPupBreed: string;
    selectedPupBirth: string;
    selectedPupName: string;
  }

const EditPuppy: React.FC<SelectedPup> = ({selectedPup, setAddedPupId, setSelectedPup, setModal, selectedPupBreed, selectedPupBirth, selectedPupName}) => {
    const [changeName, setChangeName] = useState<string>('')
    const [changeBreed, setChangeBreed] = useState<string>('')
    const [changeBirthDate, setChangeBirthDate] = useState<string>('')
    const handleEditPup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/puppies/${selectedPup}`, {
                        method: 'PUT',
                        headers: {
                            'Content-type' : 'application/json'
                        },
                        body: JSON.stringify({name: changeName ? changeName : selectedPupName, breed: changeBreed ? changeBreed : selectedPupBreed, birthDate: changeBirthDate ? changeBirthDate : selectedPupBirth})
                    }).then(response => response.json())
                    .then(data => setAddedPupId(data.id))
                    .catch(error => console.log(error))
        setChangeName('');
        setChangeBirthDate('');
        setChangeBreed('');
        setSelectedPup(null)
        setModal(false)
    }

  return (
    <form onSubmit={(e) => handleEditPup(e)} className="edit--container">
                <label>Name: </label><input placeholder={selectedPupName}  defaultValue={selectedPupName} type='text' value={changeName} onChange={(e) => setChangeName(e.target.value)}/>
                <label>Breed: </label><input placeholder={selectedPupBreed}  defaultValue={selectedPupBreed} type='text' value={changeBreed} onChange={(e) => setChangeBreed(e.target.value)}/>
                <label>Birthdate: </label><input placeholder={selectedPupBirth} defaultValue={selectedPupBirth} type='text' value={changeBirthDate} onChange={(e) => setChangeBirthDate(e.target.value)}/>
                <button type='submit'>Submit Changes</button>
            </form>
  )
}

export default EditPuppy