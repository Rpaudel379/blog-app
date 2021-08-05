import React from "react";

// user context
import { useGlobalContext } from "../../../context/context";

import Add from "./Add";
import Login from "./Login";

const Line = () => {
  const { userData } = useGlobalContext();

  if (!userData) {
    return (
      <div className="line">
        <Login />
      </div> 
    ); 
    
  }

  return (
    <div className="line">
      <Add />
    </div>
  );
};

export default Line;
 