import React from "react";
import { Link, useNavigate } from "react-router-dom";

const WakeUpBtn = () => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <div>
      {/* <Link to="/" className="btn btn-dark">
        Wake Up to Reality 👀
      </Link> */}
      <button onClick={handleNavigate} className="mt-3 btn btn-dark">
        Wake Up to Reality
      </button>
    </div>
  );
};

export default WakeUpBtn;
