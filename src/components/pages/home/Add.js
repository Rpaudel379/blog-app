import React from "react";
import { Link } from "react-router-dom";
import { useBlogProvider } from "../../../context/BlogContext";
import { useGlobalContext } from "../../../context/context";
import axios from "axios";

const Add = () => {
  const { setBlogLoading, setBlogs, getBlogs } = useBlogProvider();
  const { userData } = useGlobalContext();
  const handleMyBlog = async () => {
    setBlogLoading(true);
    try {
      const fetch = await axios.get(
        process.env.REACT_APP_BACKEND + "userBlog",
        {
          headers: { userId: userData.id },
        }
      );
      const response = await fetch.data;
      console.log(response);
      if (response) {
        setBlogs(response);
        setBlogLoading(false);
      }
    } catch (err) {
      console.log(err);
      setBlogLoading(false);
    }
  };

  const handleAllBlog = () => {
    getBlogs();
  };

  return (
    <div className="add-line">
      <div className="add">
        <Link to="/addBlog" className="btn">
          ADD
        </Link>
        <p>your blog</p>
      </div>
      <div className="blogs-btns">
        <button className="btn" onClick={handleAllBlog}>
          ALL BLOGS
        </button>
        <button className="btn" onClick={handleMyBlog}>
          MY BLOGS
        </button>
      </div>
    </div>
  );
};

export default Add;
