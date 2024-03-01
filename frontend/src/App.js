import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";
import MyContext from "./MyContext";
import { useCookies } from "react-cookie";
import PaginationData from "./PaginationData";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["theme"]);
  return (
    <div>
      <MyContext.Provider value={{ cookies, setCookies, removeCookies }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/create" element={<CreateStudent />} />
            <Route path="/update/:id" element={<UpdateStudent />} />
            <Route path="/page" element={<PaginationData />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
};

export default App;
