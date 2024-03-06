import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import logo from "./assets/lightBg1.jpg";
import logo from "./assets/bg1.jpg";
import styles from "./Student.module.css";

import MyContext from "./MyContext";
import { CSVLink, CSVDownload } from "react-csv";
import EmailRestAPI from "./EmailRestAPI";

const Student = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runHandleDelete, setrunHandleDelete] = useState(false);
  const [show, setShow] = useState();
  const [id, setId] = useState();

  const searchInputRef = useRef(null);

  // const [theme, settheme] = useState(false);

  // const [cookies, setCookies, removeCookies] = useCookies(["theme"]);
  const { cookies, setCookies } = useContext(MyContext);
  const [sortName, setSortName] = useState(false);

  /////////////////......pagination.......
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstInedx = lastIndex - recordsPerPage;
  const records = student.slice(firstInedx, lastIndex);
  const npage = Math.ceil(student.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  ////////////////////////////////////////    ////////////////////////////////////////     loading the data

  async function test() {
    setLoading(true); ////////////////////////////...............?????????????????????????????????????????????????????????????????????????
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
    }, 600);
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
  ////////////////////////////////////////////// search function

  // const handleSearch = async (e) => {
  //   let searchQuery = e.target.value;
  //   // setSearchQuery(e.target.value);

  //   const res = await fetch(`http://localhost:8081/search?name=${searchQuery}`);
  //   const data = await res.json();
  //   console.log(data);
  //   setStudent(data);
  // };
  let searchQuery = "";
  const handleSearch = async (e) => {
    // let searchQuery = e.target.value;
    searchQuery = e.target.value;
    axios
      .get(`http://localhost:8081/search?query=${searchQuery}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
    setCurrentPage(1);
  };

  /////////////////////////////////////////////////// sort function .......

  const handleSortName = async (e) => {
    setSortName(!sortName);
    axios
      .get(`http://localhost:8081/sort?sort=${sortName}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  };

  ///////////////////////////////////////////////////////////////////////   return

  // console.log(student);
  // console.log(typeof student);
  // console.log(student === undefined);

  return (
    <div
      className={`d-flex  min-vh-100 h-100  justify-content-center align-item-center `}
      style={
        cookies.theme
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
        className="p-5 rounded-5 w-75"
        style={
          cookies.theme
            ? { background: "none" }
            : { background: " linear-gradient(black,grey,black,black)" }
        }
      >
        <Link
          to="/create"
          // className={
          //   cookies.theme
          //     ? "mt-2-sm btn btn-primary"
          //     : "mt-3-sm btn btn-success"
          // }
          className={`mt-2 btn ${
            cookies.theme ? "btn-primary " : "btn-success"
          }`}
        >
          Add Record +
        </Link>
        <div className="text-white mt-4 w-50">
          <label htmlFor="search" className="me-3 fs-3">
            <span className={cookies.theme ? "text-primary" : "text-success"}>
              Search
            </span>
          </label>
          <input
            type="text"
            name="search"
            placeholder="🔎 Enter Your serach query..."
            onKeyUp={handleSearch}
            id="searchInput"
            ref={searchInputRef}
            className="rounded-4 w-50 p-2   bg-secondary-subtle  border-success
"
          />
          <span className="ms-2 me-5">
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                test();
                searchInputRef.current.value = "";
              }}
            >
              ❌
            </button>
          </span>
          <span className="ms-2">
            <button
              className={cookies.theme ? "btn btn-primary" : "btn btn-success"}
              onClick={() => handleSortName(true)}
            >
              Sort by Name
            </button>
          </span>
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
          <div className="table-responsive-sm">
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
                {records?.map((data, i) => {
                  return (
                    <tr key={i} className="">
                      <td className="fs-md-5 ps-4">{data.ID}</td>
                      <td className="fs-md-5 ">{data.Name}</td>
                      <td className="fs-md-5 ">{data.Email}</td>
                      <td className="fs-md-5 ">
                        <>
                          <Link
                            to={`/update/${data.ID}`}
                            className={
                              cookies.theme
                                ? "btn btn-primary"
                                : "btn btn-success"
                            }
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
          </div>
        )}
        {/* <img
            className="text-white"
            // src={"./lightBg1.jpg"}
            src={logo}
            alt="sssssssssssss"
          /> */}
        <div className="position-fixed bottom-0 end-0">
          <button onClick={() => setCookies("theme", false, { path: "/" })}>
            Dark Mode
          </button>
          <button onClick={() => setCookies("theme", true, { path: "/" })}>
            Light Mode
          </button>
        </div>

        {!loading && (
          <div>
            <nav className="pagination">
              <>
                <span className="page-item">
                  {currentPage === 1 ? (
                    ""
                  ) : (
                    <Link
                      to=""
                      className="page-link  bg-dark text-white"
                      onClick={prePage}
                    >
                      Prev
                    </Link>
                  )}
                </span>

                {numbers.map((pgNumber) => (
                  <span
                    key={pgNumber}
                    className={`page-item ${
                      currentPage === pgNumber ? "active" : ""
                    } `}
                  >
                    <Link
                      to=""
                      onClick={() => changeCPage(pgNumber)}
                      className="page-link  bg-dark text-white"
                    >
                      {pgNumber}
                    </Link>
                  </span>
                ))}

                <span className="page-item">
                  {currentPage === npage ? (
                    ""
                  ) : (
                    <Link
                      to=""
                      className="page-link bg-dark text-white"
                      href="#"
                      onClick={nextPage}
                    >
                      Next
                    </Link>
                  )}
                </span>
              </>
            </nav>
          </div>
        )}
        {!loading && (
          <div className="mt-4">
            <CSVLink className="btn btn-dark " data={student}>
              Download the Records
              {/* <CSVDownload data={student} target="_blank" />; */}
            </CSVLink>
          </div>
        )}

        <div className="mt-2">
          {!loading && (
            <Link to="contact" className="btn btn-dark">
              contact Us
            </Link>
          )}
        </div>
        <div className="mt-2">
          {!loading && (
            <Link to="maps" className="btn btn-dark">
              Maps Practise API
            </Link>
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
