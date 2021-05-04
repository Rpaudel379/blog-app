import React from "react";
import { useGlobalContext } from "../../context/context";
import Loading from "../Loading";
import Error from "./Error";
import Tools from "../../Tools";

const Dashboard = (props) => {
  const { userData, loading } = useGlobalContext();
  Tools(props);

  const message = { 
    first: "unauthorized login ",
    second: "Login here",
    link: "/login",
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
        <h1>Welcome {userData.username}</h1>
        <h1>Working on...</h1>
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
