import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

const Student = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);
  const [runHandleDelete, setrunHandleDelete] = useState(false);
  const [show, setShow] = useState();
  const [id, setId] = useState();
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

  return (
    <div>
      <div className="d-flex vh-100 bg-dark  bg-gradient justify-content-center align-item-center">
        {show && (
          <ModalTest
            setrunHandleDelete={setrunHandleDelete}
            show={show}
            setShow={setShow}
          />
        )}
        <div className="p-5 bg-dark  rounded-5 w-75">
          <Link to="/create" className="btn btn-success">
            Add Record +
          </Link>
          <br />
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
                <span className="visually-hidden">Loading...</span>
              </div>
              <br />
              <div className="fs-2">Loading List ...</div>
            </div>
          ) : student.length === 0 ? (
            <h2 className="text-center">
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
