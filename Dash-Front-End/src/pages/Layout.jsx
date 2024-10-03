import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Layout.css";
import { Outlet } from "react-router-dom";
import { Graph1, Graph2 } from "../components/Graphs";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État pour contrôler l'ouverture/fermeture de la sidebar
  const [rotating, setRotating] = useState(false);
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

  return (
    <div ref={gridcontainerRef} className={`grid-container ${isSidebarOpen ? "grid-open" : "grid-close"}`}>
      <div className={`sidebar ${isSidebarOpen ? "slide-in" : "slide-out"}`} >
        <Sidebar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle} rotating={rotating}/>
      </div>
      <div className={`main-content ${isSidebarOpen ? "slide-in" : "slide-out"}`}>
        <div className="header">
          <Navbar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle} rotating={rotating}/>
        </div>
        <div className="content">
          <Outlet />
        </div>  
      </div>
    </div>
  );
}

const LayoutLoader = async ()=>{
  const user = axios.get('http://localhost:5000/user',{
    headers: {
      'Authorization': localStorage.getItem('token'),
    }
  })
  return (await user).data;
}

export { Layout, LayoutLoader };