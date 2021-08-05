import React, { useState, useEffect } from "react";

// custom utilities
import Tools from "../../Tools";

// user context
import { useGlobalContext } from "../../context/context";

// blog context
import { useBlogProvider } from "../../context/BlogContext";

// components of Home
import Hero from "./home/Hero";
import Line from "./home/Line";
import AllBlogs from "./home/AllBlogs";


const Home = (props) => {

  Tools(props);
  
  // user context
  const { userData } = useGlobalContext();
  // blog context
  const { blogs, blogLoading } = useBlogProvider();
  

  if (!userData) {
    return (
      <div className="home container">
        <Hero />
        <Line />
        <AllBlogs blogs={blogs} loading={blogLoading} />
      </div>
    );
  } 

  return (
    <div className="home container">
      <Hero />
      <Line />
      <AllBlogs blogs={blogs} loading={blogLoading} />
    </div>
  );
};

export default Home;
  