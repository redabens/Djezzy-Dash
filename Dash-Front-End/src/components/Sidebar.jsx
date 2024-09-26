import { useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import "../styles/Sidebar.css";

function Sidebar({toogleSidebar,isSidebarOpen}) {
  return (
    <>
        <div className="menubt" onClick={toogleSidebar}>
            <img
              src="/assets/Menu.svg"
              alt="menu"
              style={{ width: "25px", height: "25px" }}
            />
        </div>
        <div className="categories">
        </div>
        <div className="fixed-categories">
          <div className="deconnexion">
            <img
              src="/assets/logo_deconnexion.svg"
              alt="logo_deconnexion"
              style={{width: "23px", height: "23px",}}
            />  
            <span>Déconnexion</span>
          </div>
        </div>
    </>
  );
}

//loader function
export async function Sidebarloader() {

}

//Définir les PropTypes pour le composant
Sidebar.propTypes = {
    toogleSidebar: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
};
export default Sidebar;
