import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import StudentPortal from "./components/studentPortal";
import Login from "./components/loginPage";
import NavigationBar from "./components/navigationBar";
import Register from "./components/registerPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPortal from "./components/adminPage";
import LostAndFound from "./components/lostFound";
import LandingPage from "./components/landingPage";
import Announcements from "./components/adminAnnouncements";
import Complaints from "./components/studentComplaints";


const App = () => (
  <div>
    <ToastContainer />
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/lostfound" element={<LostAndFound />} />
          <Route path="/adminAnnouncements" element={<Announcements />} />
          <Route path="/studentComplaints" element={<Complaints />} />
        </Routes>
      </div>
    </Router>
  </div>
);

export default App;
