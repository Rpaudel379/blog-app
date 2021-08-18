import React from "react";
import Tools from "../Tools";
import { useGlobalContext } from "../context/context";
import { useBlogProvider } from "../context/BlogContext";

import Hero from "../components/Home/Hero";
import Line from "../components/Home/Line";
import AllBlogs from "../components/Home/AllBlogs";
const Home = (props) => {
  Tools(props);
  const { userData } = useGlobalContext();
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
