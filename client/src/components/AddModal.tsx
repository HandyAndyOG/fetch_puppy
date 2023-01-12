import React, { useRef } from "react";
import AddPuppy from './AddPuppy'
import './Modal.css'

interface ModalProp {
    setAddModal: (value: boolean) => void;
    setAddedPupId: (value: number) => void;
}

export const AddModal: React.FC<ModalProp> = ({setAddModal, setAddedPupId}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === modalRef.current) {
      setAddModal(false);
    }
  };

  return (
    <>
    <div className="container--modal" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <AddPuppy setAddModal={setAddModal} setAddedPupId={setAddedPupId}/>
        <button className="modal--button" onClick={() => setAddModal(false)}>X</button>
      </div>
    </div>
    </>
  );
};