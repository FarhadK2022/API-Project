import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import { Modal } from "../../context/Modal";
import image from "../../images/dontbnb-rev3.svg"
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link exact to="/">
            <img
              className="navbar-icon"
              src= {image}
              alt="Don'tBnB logo"
            ></img>
          </Link>
        </div>
        <div className="navbar-right">
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
      </div>

    </>
  );
}

export default Navigation;
