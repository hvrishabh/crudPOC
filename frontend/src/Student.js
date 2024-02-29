import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import logo from "./assets/lightBg1.jpg";
import logo from "./assets/bg1.jpg";

const Student = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);
  const [runHandleDelete, setrunHandleDelete] = useState(false);
  const [show, setShow] = useState();
  const [id, setId] = useState();
  const [theme, settheme] = useState(false);
  ////////////////////////////////////////    ////////////////////////////////////////     loading the data

  async function test() {
    try {
      const res = await fetch("http://localhost:8081/");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();

      setStudent(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      test();
    }, 300);
  }, []);

  /////////////////////////////////////////////////////////// handle Delete

  // const handleDelete = function (id) {
  //   axios
  //     .delete("http://localhost:8081/student/" + id)
  //     .catch((err) => console.log(err));
  // };

  // const handleDelete = async function (id) {
  //   await fetch("http://localhost:8081/student/" + id);
  // };

  const handleDelete = async function () {
    try {
      // console.log(runHandleDelete);

      await axios.delete("http://localhost:8081/student/" + id);
      // window.location.reload();
      test();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    runHandleDelete && handleDelete();

    return setrunHandleDelete(false);
  }, [runHandleDelete]);

  // const handleDelete = async function (id) {
  //   return (
  //     <Popup trigger={<button> Trigger</button>} position="right center">
  //       <div>Popup content here !!</div>
  //     </Popup>
  //   );
  // };
  ///////////////////////////////////////////////////////////////////////   return

  console.log(theme);
  return (
    <div>
      {/* <div className="d-flex vh-100 bg-dark  bg-gradient justify-content-center align-item-center"> */}
      {/* <div
        className={`d-flex vh-100  justify-content-center align-item-center
        ${theme ? "bg-primary  bg-gradient" : "bg-dark  bg-gradient"}`}
      > */}
      <div
        className={`d-flex vh-100  justify-content-center align-item-center `}
        style={
          theme
            ? {
                backgroundImage: `url(${logo})`,
                backgroundPosition: "cover",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }
            : {
                background: " linear-gradient(black, grey)",
                // backdropFilter: "blur(10px)",
              }
        }
      >
        {show && (
          <ModalTest
            setrunHandleDelete={setrunHandleDelete}
            show={show}
            setShow={setShow}
          />
        )}
        {/* <div className="p-5 bg-dark  rounded-5 w-75"> */}
        <div
          className="p-5   rounded-5 w-75"
          style={
            theme
              ? { background: "none" }
              : { background: " linear-gradient(black,grey,black,black)" }
          }
        >
          <Link to="/create" className="btn btn-success">
            Add Record +
          </Link>
          <div className="text-white mt-4 w-50">
            <label htmlFor="search" className="me-3 fs-3">
              Search
            </label>
            <input
              type="text"
              name="search"
              placeholder="🔎 Enter Your serach query..."
              className="rounded-4 w-50 p-2   bg-secondary-subtle  border-success
"
            />
          </div>
          <br />
          <br />

          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "47%",
              }}
            >
              <div
                className="spinner-border text-primary fs-2"
                style={{
                  height: "3rem",
                  width: "3rem",
                }}
                role="status"
              >
                <span className="visually-hidden ">Loading...</span>
              </div>
              <br />
              <div className="fs-2 text-white">Loading List ...</div>
            </div>
          ) : student.length === 0 ? (
            <h2 className="text-center text-white">
              Please <br />
              Add some records... <br />
              🖊💻
            </h2>
          ) : (
            <table className=" table table-striped  table table-bordered border-success  table-hover ">
              <thead>
                <tr className="">
                  <th className="fs-md-4 bg-success border-dark ps-md-4">ID</th>
                  <th className="fs-md-4 bg-success border-dark">Name</th>
                  <th className="fs-md-4 bg-success border-dark">Email</th>
                  <th className="fs-md-4 bg-success border-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {student.map((data, i) => {
                  return (
                    <tr key={i} className="">
                      <td className="fs-md-5 ps-4">{data.ID}</td>
                      <td className="fs-md-5 ">{data.Name}</td>
                      <td className="fs-md-5 ">{data.Email}</td>
                      <td className="fs-md-5 ">
                        <>
                          <Link
                            to={`/update/${data.ID}`}
                            className="btn btn-success"
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={(e) => {
                              // handleDelete(data.ID);
                              setId(data.ID);
                              setShow(true);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {/* <img
            className="text-white"
            // src={"./lightBg1.jpg"}
            src={logo}
            alt="sssssssssssss"
          /> */}
          <div className="position-fixed bottom-0 end-0">
            <button onClick={() => settheme(false)}>Dark Mode</button>
            <button onClick={(e) => settheme(true)}>Light Mode</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ModalTest({ setrunHandleDelete, setShow }) {
  return (
    <div
      className="modal show "
      style={{
        display: "block",
        position: "absolute",
        top: "0%",
        // backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <p className="fs-4"> Are you sure to delete this record ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Go Back 😊
          </Button>
          <Button
            className="btn btn-danger"
            variant="primary"
            onClick={() => {
              setrunHandleDelete(true);
              setShow(false);
            }}
          >
            Delete 😢
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Student;
