import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";
import Dashboard from "./Dashboard";
import { BiSolidDashboard } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { FaKey } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import History from "./History";
import $ from 'jquery';
import { IoClose } from "react-icons/io5";


$("#mobile-open-collapse").click(function () {
  $("#sidebar").show();
});

// $("#mobile-close-collapse").click(function () {
//   $("#sidebar").hide();
// });

function SidebarLayout() {
 
  const open = () => {
    $("#sidebar").show();
    $("#mobile-open-collapse").hide();
    $("#mobile-close-collapse").show();
  }

  const close = () => {
    $("#sidebar").hide();
    $("#mobile-open-collapse").show();
    $("#mobile-close-collapse").hide();
  }


  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="row">
        
        <span id="mobile-open-collapse" onClick={open}>&#9776;</span>
        <span id="mobile-close-collapse" onClick={close}> <IoClose /> </span>
        {/* Sidebar */}
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar">

          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""
                    }`}
                  href="/dashboard"
                >
                  <BiSolidDashboard /> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === "/history" ? "active" : ""
                    }`}
                  href="/history"
                >
                  <TbListDetails /> Reward
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {location.pathname === "/dashboard" && <Dashboard />}
          {location.pathname === "/history" && <History />}
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;