import React, { useRef } from "react";
import EditPuppy from './EditPuppy'
import './Modal.css'

interface ModalProp {
    setModal: (value: boolean) => void;
    selectedPup: number | null;
    setSelectedPup: (value: number | null) => void;
    setAddedPupId: (value: number) => void;
    selectedPupBreed: string
    selectedPupBirth: string
    selectedPupName: string
}

export const Modal: React.FC<ModalProp> = ({setModal, selectedPup, setAddedPupId, setSelectedPup, selectedPupName, selectedPupBreed, selectedPupBirth}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === modalRef.current) {
      setModal(false);
    }
  };

  return (
    <>
    <div className="container--modal" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div className="container--idname">
          <h2>Edit Puppy</h2>
            <div>
                <span className="modal--label">ID: </span><span>{selectedPup}</span>
            </div>
            <div>
                <span className="modal--label">Current Name: </span><span>{selectedPupName} </span>
            </div>
        </div>
        <EditPuppy selectedPup={selectedPup} setAddedPupId={setAddedPupId} setSelectedPup={setSelectedPup} setModal={setModal} selectedPupBreed={selectedPupBreed} selectedPupBirth={selectedPupBirth} selectedPupName={selectedPupName}/>
        <button className="modal--button" onClick={() => setModal(false)}>X</button>
      </div>
    </div>
    </>
  );
};