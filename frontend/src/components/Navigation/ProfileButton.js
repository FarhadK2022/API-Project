import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="user-menu" onClick={openMenu}>

        <i className="fa-solid fa-bars fa-xl"/>
        <i className="fas fa-user-circle fa-2xl" />

      </button>

      {showMenu &&
        (user ? (
          <ul className="profile-dropdown">
            <li>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <button className="button"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Become a Host
              </button>
            </li>
            <li>
              <button className="button" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="profile-dropdown">
            <li>
              <button className="button"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Log In
              </button>
            </li>
            <li>
              <button className="button"
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </li>
            <li>
              <button className="button"
                onClick={() => {
                  const demoUser = {
                    credential: "demo-lition@testdrive.io",
                    password: "helloworld",
                  };
                  return dispatch(sessionActions.login(demoUser));
                }}
              >
                Demo User
              </button>
            </li>
          </ul>
        ))}
    </>
  );
}

export default ProfileButton;
