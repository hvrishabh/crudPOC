import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";
import logo from "./assets/lightBg1.jpg";
import Validation from "./Validation";
import WakeUpBtn from "./WakeUpBtn";

const CreateStudent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { cookies } = useContext(MyContext);

  //////functions..........
  const handleValues = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  ////////////// validation ...

  const handleValidation = () => {
    setErrors(Validation(values));
  };
  //////////// submit function ...........

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setErrors(Validation(values));

    if (errors.name === "" && errors.email === "")
      await axios
        .post("http://localhost:8081/create", values)
        .then((res) => {
          // console.log(res)
          navigate("/");
        })
        .catch((err) => console.log(err));
  };

  ////////////////////////////////////////////////// handlsubmit using the get request ...........................
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await axios
  //       //   .post("http://localhost:8081/create?name=${name}&email=${email}")
  //       .get(
  //         `http://localhost:8081/create?name=${values.name}&email=${values.email}`
  //       )

  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));

  //     navigate("/");
  //   };

  return (
    <>
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
          {/* // <div className="d-flex justify-content-center align-items-center vh-100 bg-dark  bg-gradient ">
    //   <div className="bg-success w-50 rounded p-3 text-white"> */}

          <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="form-control"
                onChange={handleValues}
              />
              {errors.name && (
                <span className="bg-danger p-1">{errors.name}</span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="form-control"
                onChange={handleValues}
              />
              {errors.email && (
                <span className="bg-danger">{errors.email}</span>
              )}
            </div>
            <button
              onClick={handleValidation}
              className={cookies.theme ? "btn btn-success" : "btn btn-dark"}
            >
              Submit
            </button>
          </form>

          <WakeUpBtn />
        </div>
      </div>
    </>
  );
};

export default CreateStudent;
