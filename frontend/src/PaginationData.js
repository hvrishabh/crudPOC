import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const PaginationData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const service_id = "service_93p2o81";
    const template_id = "template_kv8lh3o";
    const publicKey = "VXveyfgCADdTcNuej";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Web Wizard",
      message: message,
    };

    // send email using EmailJS
    emailjs
      .send(service_id, template_id, templateParams, publicKey)
      .then((response) => {
        console.log(`Email sent successfully`, response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log("error in sending email ", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex emailForm">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="textarea"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default PaginationData;

// import { CSVLink, CSVDownload } from "react-csv";

// let names = [
//   { firstName: "John", lastName: "Cena" },
//   { firstName: "Rey", lastName: "Mysterio" },
// ];

// const PaginationData = (props) => {
//   return (
//     <>
//       <CSVLink data={names}>Download me</CSVLink>; // or
//       <CSVDownload data={names} target="_blank" />;
//     </>
//   );
// };
// export default PaginationData;

// import React, { useState } from "react";
// import Data from "./data.json";
// import { Link } from "react-router-dom";

// const PaginationData = () => {
//   let [currentPage, setCurrentPage] = useState(1);
//   let recordsPerPage = 5;
//   let lastIndex = currentPage * recordsPerPage;
//   let firstInedx = lastIndex - recordsPerPage;
//   let records = Data.slice(firstInedx, lastIndex);
//   let npage = Math.ceil((Data.length * 1) / recordsPerPage);
//   let numbers = [...Array(npage + 1).keys()].slice(1);

//   function prePage() {
//     if (currentPage !== 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }
//   function changeCPage(id) {
//     setCurrentPage(id);
//   }
//   function nextPage() {
//     if (currentPage !== npage) {
//       setCurrentPage(currentPage + 1);
//     }
//   }
//   //   console.log(records);

//   return (
//     <div>
//       <table className="table">
//         <thead>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Email</th>
//         </thead>
//         <tbody>
//           {records.map((d, i) => {
//             return (
//               <tr key={i}>
//                 <td>{d.ID}</td>
//                 <td>{d.Name}</td>
//                 <td>{d.Email}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <nav className="pagination">
//         <ul>
//           <li className="page-item">
//             <Link to="" className="page-link" onClick={prePage}>
//               Prev
//             </Link>
//           </li>

//           {numbers.map((pgNumber) => (
//             <li
//               key={pgNumber}
//               className={`page-item ${
//                 currentPage === pgNumber ? "active" : ""
//               } `}
//             >
//               <Link
//                 to=""
//                 onClick={() => changeCPage(pgNumber)}
//                 className="page-link"
//               >
//                 {pgNumber}
//               </Link>
//             </li>
//           ))}

//           <li className="page-item">
//             <Link to="" className="page-link" href="#" onClick={nextPage}>
//               Next
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PaginationData;
