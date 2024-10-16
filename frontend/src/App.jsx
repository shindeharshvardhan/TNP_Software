// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import StudentForm from './components/StudentForm'; 
// import Content from './components/Content';
// import Navbar from './components/Navbar';
// import './App.css';

// function App() {
//   return (
//     <Router>
//     <div className="App">
      
//       <Navbar /> 
//       <Routes>
//         <Route path="/" element={<StudentForm />} />  
//         <Route path="/events" element={<Content />} />  

//       </Routes>
//     </div>
//   </Router>
//   );
// }

// export default App;


import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
import Companies from "./components/Companies";
import Login from "./components/Login";
import Followup from "./components/Followup";
import StudentDetails from "./components/StudentDetails";
import "./App.css";
import Content from "./components/Content";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen w-full">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/events" />} /> */}
            <Route path="/events" element={<Content />} />
            <Route path="/students" element={<Followup />} />
            <Route path="/details" element={<StudentDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/events" element={<Content />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;