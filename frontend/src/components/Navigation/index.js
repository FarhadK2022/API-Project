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
      <div className="bar1">
        <li className="logo-container">
          <NavLink exact to="/">
            <img
              className="logo"
              src="./images/favicon_rev2.png"
              alt="Don'tBnB logo"
            ></img>
          </NavLink>
        </li>
      </div>
      <div className="bar2">
        <li className="profilebutton">
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
            {login ? (
              <LoginForm setShowModal={setShowModal} />
            ) : (
              <SignupForm setShowModal={setShowModal} />
            )}
            {login && sessionUser ? (
              <CreateSpotForm setShowModal={setShowModal} />
            ) : (
              false
            )}
          </Modal>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
