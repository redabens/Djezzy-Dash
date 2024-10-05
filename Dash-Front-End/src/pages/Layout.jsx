import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Layout.css";
import { Navigate, Outlet } from "react-router-dom";
import { Graph1, Graph2 } from "../components/Graphs";
import { func } from "prop-types";

export default function Layout(){
  const token = sessionStorage.getItem('token');
  console.log(token);
  if(!token){
    return <Navigate to='/login'/>
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État pour contrôler l'ouverture/fermeture de la sidebar
  const [rotating, setRotating] = useState(false);
  const [user, setUser] = useState({}); // État pour stocker les données re
  const gridcontainerRef = useRef(null);

  const openClass = () => {
    gridcontainerRef.current.classList.remove("grid-close");
    gridcontainerRef.current.classList.add("grid-open");
  };

  const closeClass = () => {
    gridcontainerRef.current.classList.remove("grid-open");
    gridcontainerRef.current.classList.add("grid-close");
  };

  const handleRotateLogo = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 1000); // Duration should match the animation duration
  };

  const handleSidebarToggle = () => {
    if (isSidebarOpen) {
      closeClass();
    } else {
      openClass();
    }
    handleRotateLogo();
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            'Authorization': token,
          }
        });
        if (response.status === 200) {
          console.log(response.data.user);
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    };
  
    fetchUser();
  },[]);
  
  return (
    <div ref={gridcontainerRef} className={`grid-container ${isSidebarOpen ? "grid-open" : "grid-close"}`}>
      <div className={`sidebar ${isSidebarOpen ? "slide-in" : "slide-out"}`} >
        <Sidebar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle} rotating={rotating} user={user}/>
      </div>
      <div className={`main-content ${isSidebarOpen ? "slide-in" : "slide-out"}`}>
        <div className="header">
          <Navbar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle} rotating={rotating} user={user}/>
        </div>
        <div className="content">
          <Outlet />
        </div>  
      </div>
    </div>
  );
}