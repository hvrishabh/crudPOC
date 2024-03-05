import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import WakeUpBtn from "./WakeUpBtn";

const EmailRestAPI = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const [toEmail, setToEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_93p2o81";
    const templateId = "template_kv8lh3o";
    const publicKey = "VXveyfgCADdTcNuej";

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        // to_email: toEmail,
        from_name: name,
        from_email: email,
        // to_name: toName,
        message: message,
      },
    };

    // send email using emailJS
    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res.data);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-dark bg-gradient vh-100 h-100 d-flex justify-content-center align-items-center">
      <div className=" px-5 border border-primary p-3">
        <p className="pt-3 text-white fs-3">Customer Contact section</p>
        <form onSubmit={handleSubmit} className="form-group text-white">
          <div>
            <label className="form-check-label mt-3">Customer Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="form-check-label mt-3">
              Customer Email Address
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div>
            <label className="form-check-label mt-3">
              Reciever Email Address
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="To Email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
            />
          </div> */}
          <div>
            <label className="form-check-label mt-3">
              Message you want to send{" "}
            </label>
            <textarea
              className="form-control"
              name="textarea"
              cols="10"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-secondary my-2">
            Send Email
          </button>
        </form>
        <WakeUpBtn />
      </div>
    </div>
  );
};

export default EmailRestAPI;
