import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyContext from "./MyContext";
import logo from "./assets/lightBg1.jpg";
import Validation from "./Validation";
import WakeUpBtn from "./WakeUpBtn";

const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const { cookies } = useContext(MyContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const onUpdate = () => {
    axios
      .get("http://localhost:8081/getUpdate/" + id)
      .then((res) => {
        setName(res.data[0].Name);
        setEmail(res.data[0].Email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onUpdate();
  }, []);

  const handleValidation = () => {
    setErrors(Validation({ name, email }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.name === "" && errors.email === "")
      axios
        .put("http://localhost:8081/update/" + id, { name, email })
        .then((res) => {
          // console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="w-50 bg-success text-dark  rounded p-3"> */}
      <div
        className={
          cookies.theme
            ? "  d-flex justify-content-center align-items-center vh-100"
            : "  bg-dark bg-gradient d-flex justify-content-center align-items-center vh-100"
        }
        style={
          cookies.theme
            ? {
                backgroundImage: `url(${logo})`,
                backgroundPosition: "cover",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        <div
          className={
            cookies.theme
              ? " bg-primary  text-white w-50 rounded p-3  "
              : " bg-success text-white w-50 rounded p-3 "
          }
        >
          <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
            <div className="mb-2 mt-3">
              <label htmlFor="name" className="fs-5 text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                name="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <span className="bg-danger p-1">{errors.name}</span>
              )}
            </div>
            <div className="mb-2 ">
              <label htmlFor="email" className="fs-5 text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Name"
                className="form-control"
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="bg-danger">{errors.email}</span>
              )}
            </div>
            <button
              onClick={handleValidation}
              className={cookies.theme ? "btn btn-success" : "btn btn-dark"}
            >
              Update
            </button>
          </form>

          <WakeUpBtn />
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
