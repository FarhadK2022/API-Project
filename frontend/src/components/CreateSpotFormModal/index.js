import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateSpotForm from "./CreateSpotForm";
import './CreateSpotFormModal.css'

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
