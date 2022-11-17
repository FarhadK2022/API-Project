import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import EditSpotForm from "./EditSpotForm";
import './EditSpotFormModal.css'

function EditSpotFormModal({spot}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser === null) return 

  if (sessionUser.id === spot.ownerId) {

    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit Spot</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSpotForm spot={spot} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }
}

export default EditSpotFormModal;
