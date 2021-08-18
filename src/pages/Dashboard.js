import React, { useState } from "react";
import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";
import Error from "./Error";
import Tools from "../Tools";
import "../components/Dashboard/dashboard.css";
import { AiOutlineCalendar } from "react-icons/ai";
import cookie from "js-cookie";

/* axios */

import axios from "axios";

/* axios */

const Dashboard = (props) => {
  const { userData, loading } = useGlobalContext();

  // form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  // form

  Tools(props);

  const message = {
    first: "unauthorized login ",
    second: "Login here",
    link: "/login",
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    if (!username) {
      setError({ nameError: "must provide name" });
    } else {
      handleAPI("username", username);
    }
  };
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!email) {
      setError({ emailError: "must provide email" });
    } else {
      handleAPI("email", email);
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (!password) {
      setError({ passwordError: "must provide password" });
    } else if (password.length < 6) {
      setError({ passwordError: "password must be minimum 6 characters" });
    } else {
      handleAPI("password", password);
    }
  };

  const handleAPI = async (type, value) => {
    try {
      let token = cookie.get("jwt");

      const request = await axios.post(
        `${process.env.REACT_APP_BACKEND}/change`,
        {
          userId: userData.id,
          name: userData.username,
          type,
          value,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      const response = await request.data;
      if (response.success) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && !userData) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
    return <Error title="content blocked" bg="#284b63" textContent={message} />;
  }

  return (
    <>
      <div className="dashboard container">
        <div className="dashboard-header">
          <h2>
            Welcome <span className="name">{userData.username}</span>
          </h2>
          <p>
            <AiOutlineCalendar /> {new Date().toDateString()}
          </p>
        </div>

        <div className="dashboard-info">
          <h3>Your Info</h3>
          <p>
            USERNAME: <span>{userData.username}</span>
          </p>
          <p>
            EMAIL: <span>{userData.email}</span>
          </p>
        </div>

        <div className="dashboard-change">
          <h3>Change Your Info</h3>
          {/* username */}
          <div className="dashboard-change-content">
            <p>
              Username: <span>{userData.username}</span>
            </p>
            <form className="dashboard-input" onSubmit={handleSubmitUsername}>
              <p>Change your username</p>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {<span className="dashboard-error">{error.nameError}</span>}
              <button type="submit">Save Changes</button>
            </form>
          </div>

          {/* email */}
          <div className="dashboard-change-content">
            <p>
              Email: <span>{userData.email}</span>
            </p>
            <form className="dashboard-input" onSubmit={handleSubmitEmail}>
              <p>Change your email</p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {<span className="dashboard-error">{error.emailError}</span>}

              <button type="submit">Save Changes</button>
            </form>
          </div>
          {/* password */}
          <div className="dashboard-change-content">
            <p>Password </p>
            <form className="dashboard-input" onSubmit={handleSubmitPassword}>
              <p>Change your password</p>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {<span className="dashboard-error">{error.passwordError}</span>}

              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

/*  useEffect(() => {
    const checkAuth = async () => {
      let token = cookie.get("jwt");
      if (token) {
        try {
          const tokenRes = await axios.post(
            "http://localhost:5000/valid",
            null,
            {
              headers: { "x-auth-token": token },
            }
          );
          if (tokenRes.data) {
            console.log(tokenRes.data);
            setUserData(tokenRes.data);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    };
    checkAuth();
  }, [setUserData]); */
