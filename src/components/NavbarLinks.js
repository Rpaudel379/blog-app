import React from "react";
import { Link } from "react-router-dom";

// loader component
import LoadingNav from "./LoadingNav";

//context
import { useGlobalContext } from "../context/context";

const NavbarLinks = ({ setBars, handleLogout }) => {
  
  // from context
  const { userData, loading } = useGlobalContext();

  const loggedIn = [
    {
      id: 1,
      link: "/dashboard",
      text: "dashboard",
    },
    {
      id: 2,
      link: "/",
      text: "logout",
    },
  ];
  const notLoggedIn = [
    {
      id: 1,
      link: "/",
      text: "home",
    },
    {
      id: 2,
      link: "/login",
      text: "login",
    },
    {
      id: 3,
      link: "/signup",
      text: "register",
    },
  ];

  if (loading) {
    return <LoadingNav />;
  }

  if (!loading && !userData) {
    return (
      <>
        {notLoggedIn.map((links) => {
          return (
            <li key={links.id}>
              <Link to={links.link} onClick={() => setBars(false)}>
                {links.text}
              </Link>
            </li>
          );
        })}
      </>
    );
  }

  return (
    <>
      {" "}
      <li>
        <Link to="/" className="navbar-username" onClick={() => setBars(false)}>
          {userData.username}
        </Link>
      </li>
      {loggedIn.map((links) => {
        return (
          <li key={links.id}>
            <Link
              to={links.link}
              onClick={(e) => {
                handleLogout(e);
                setBars(false);
              }}
            >
              {links.text}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavbarLinks;
