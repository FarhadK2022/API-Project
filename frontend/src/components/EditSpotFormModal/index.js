import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "./EditSpotForm";
import "./EditSpotFormModal.css";

function EditSpotFormModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
