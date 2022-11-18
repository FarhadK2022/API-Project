import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReviewForm from "./CreateReviewForm";
import './CreateReviewFormModal.css'

function CreateReviewFormModal(spotId) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModal={setShowModal} spotId={spotId}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;
