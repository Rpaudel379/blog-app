import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    setBlogLoading(true);
    try {
      const fetch = await axios.get(process.env.REACT_APP_BACKEND + "getblogs");
      const response = await fetch.data;
      console.log(response);
      if (response) {
        setBlogs(response);
        setBlogLoading(false);
      }
    } catch (err) {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{ blogs, blogLoading, setBlogs, setBlogLoading, getBlogs }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogProvider = () => {
  return useContext(BlogContext);
};

export { BlogProvider };
