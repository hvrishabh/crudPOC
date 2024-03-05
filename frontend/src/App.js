import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";
import MyContext from "./MyContext";
import { useCookies } from "react-cookie";
import PaginationData from "./PaginationData";
import EmailRestAPI from "./EmailRestAPI";
import SendMessage from "./SendMessage";

import MapLocation from "./MapLocation";
import MapLocation2 from "./MapLocation2";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["theme"]);

  return (
    <div>
      <MyContext.Provider
        value={{
          cookies,
          setCookies,
          removeCookies,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/create" element={<CreateStudent />} />
            <Route path="/update/:id" element={<UpdateStudent />} />
            <Route path="/page" element={<PaginationData />} />
            <Route path="/contact" element={<EmailRestAPI />} />
            <Route path="/sendMessage" element={<SendMessage />} />
            <Route path="/map" element={<MapLocation />} />
            <Route path="/map2" element={<MapLocation2 />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
};

export default App;
