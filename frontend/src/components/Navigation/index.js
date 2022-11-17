import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import "./Navigation.css";
import { Modal } from "../../context/Modal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <ul className="navbar">
      <NavLink exact to="/">
        <h1>Don'tBnb</h1>
      </NavLink>
      <li>
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        )}
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal}/>
          {login ? (
            <LoginForm setShowModal={setShowModal} />
          ) : (
            <SignupForm setShowModal={setShowModal} />
          )}
        </Modal>
      )}
    </ul>
  );
}

export default Navigation;
