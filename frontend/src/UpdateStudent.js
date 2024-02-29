import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="w-50 bg-success text-dark  rounded p-3">
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
            </div>
            <div className="mb-2 ">
              <label htmlFor="email" className="fs-5 text-white">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
