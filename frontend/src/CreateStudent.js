import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleValues = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-gradient ">
      <div className="bg-success w-50 rounded p-3 text-white">
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
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              className="form-control"
              onChange={handleValues}
            />
          </div>
          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
