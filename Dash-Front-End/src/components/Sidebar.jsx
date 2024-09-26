import { useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import "../styles/Sidebar.css";

function Sidebar({toogleSidebar,isSidebarOpen}) {
  return (
    <div className="Sidebar">
        <div onClick={toogleSidebar}>
            <img
              src="/assets/Menu.svg"
              alt="menu"
              style={{ width: "25px", height: "25px" }}
            />
        </div>
    </div>
  );
}

//Définir les PropTypes pour le composant
Sidebar.propTypes = {
    toogleSidebar: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
};
export default Sidebar;
