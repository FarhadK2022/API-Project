import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "./EditSpotForm";
import './EditSpotFormModal.css'

function EditSpotFormModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot}/>
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
