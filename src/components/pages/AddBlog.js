import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobalContext } from "../../context/context";
import Loading from "../Loading";
import Error from "./Error";
import Tools from "../../Tools";
import axios from "axios";

const AddBlog = (props) => {
  const { userData, loading } = useGlobalContext();
  const [imgName, setImgName] = useState("");
  const [img64, setImg64] = useState("");
  const [error, setError] = useState("");
  const [userErrors, setUserErrors] = useState();
  const [redirect, setRedirect] = useState(false);
  Tools(props);

  const textContent = {
    first: "unauthorized login ",
    second: "Login here",
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && !userData) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return (
      <Error title="content blocked" bg="#284b63" textContent={textContent} />
    );
  }

  const handleImageChange = (e) => {
    const types = ["image/jpeg", "image/jpg", "image/png"];
    const selected = e.target.files[0];
    if (!types.includes(selected.type)) {
      setError("file type of jpeg jpg and png only");
      return;
    }
    setImgName(selected.name);
    let reader = new FileReader();
    reader.onerror = (e) => {
      setError(e.target.error);
    };
    reader.readAsDataURL(selected);
    reader.onload = (e) => {
      setImg64((prev) => e.target.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;

    try {
      const request = await axios.post(
        process.env.REACT_APP_BACKEND + "addblog",
        {
          title,
          body,
          image: img64,
          userId: userData.id,
          name: userData.username,
        }
      );

      const response = await request.data;
      console.log(response);

      if (response) {
        setRedirect(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      //? if some errors while adding blog
      err.response.data && setUserErrors(err.response.data);
    }
  };

  return (
    <>
      {redirect && (
        <div className="model">
          <div className="model-content">
            Blog added successfuly. now redirecting to Home page.
          </div>
        </div>
      )}

      <div className="add-blog container">
        <form onSubmit={handleSubmit}>
          {error && <div className="blog-error">{error}</div>}
          <div className="form-error">{userErrors && userErrors.image}</div>
          <div className="input image">
            <label htmlFor="image">
              <FiUploadCloud className="icon" />
              <p>{imgName ? imgName : "select an image"}</p>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-error">{userErrors && userErrors.title}</div>

          <div className="input">
            <input type="text" name="title" required placeholder="title" />
          </div>
          <div className="form-error">{userErrors && userErrors.body}</div>

          <div className="input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              placeholder="body"
              required
            ></textarea>
          </div>
          <div className="input">
            <button className="add-button">Add Your Blog</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
