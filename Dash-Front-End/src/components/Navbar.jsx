import { useEffect, useRef, useState } from "react";
import PropTypes, { func } from 'prop-types';
import LogoDjezzy from "../components/LogoDjezzy";
import "../styles/Navbar.css";

export default function Navbar({toogleSidebar,isSidebarOpen,rotating}) {
  const navbarRef = useRef(null);
  const openClass = ()=>{
    // navbarRef.current.classList.remove("navbar-close");
    navbarRef.current.classList.add("navbar-open");
  }
  const closeClass = ()=>{
    navbarRef.current.classList.remove("navbar-open");
    // navbarRef.current.classList.add("navbar-close");
  }
  const handleToggle = () => {
    if(isSidebarOpen){
      closeClass();
    }
    else{
      openClass();
    }  
    toogleSidebar();
  }
  return (
    <div ref={navbarRef} className="navbar navbar-open">
      {isSidebarOpen?
      (<div className="navbarProfile">
        <h3 style={{ fontSize: "0.9em" }}>reda.bens</h3>
        <div>
          <img
            className="pdp"
            src="/assets/profile-circle.svg"
            alt="photo_profil"
          />
        </div>
      </div>)
        :(<div className="navbarElements">
        <div className="navbarMenu" onClick={handleToggle}>
              <img
                src="/assets/Menu.svg"
                alt="menu"
                style={{ width: "3.6vh", height: "3.6vh" }}
              />
              <LogoDjezzy rotating={rotating} />
        </div>
        <div className="navbarProfile">
          <h3 style={{ fontSize: "0.9em" }}>reda.bens</h3>
          <div>
            <img
              className="pdp"
              src="/assets/profile-circle.svg"
              alt="photo_profil"
            />
          </div>
        </div>
      </div>)}
    </div>
  );
}

//Définir les PropTypes pour le composant
Navbar.propTypes = {
  toogleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};
