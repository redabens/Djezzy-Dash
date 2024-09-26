import { useRef, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Layout.css"
export default function Layout(){
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État pour contrôler l'ouverture/fermeture de la sidebar
  const gridcontainerRef= useRef(null);
  const openClass = ()=>{
    gridcontainerRef.current.classList.remove("grid-close");
    gridcontainerRef.current.classList.add("grid-open");
  }
  const closeClass = ()=>{
    gridcontainerRef.current.classList.remove("grid-open");
    gridcontainerRef.current.classList.add("grid-close");
  }
  const handleSidebarToggle = () => {
    if(isSidebarOpen){
      closeClass();
    }
    else{
      openClass();
    }  
    setIsSidebarOpen(!isSidebarOpen);
  }
    return (
    <div ref={gridcontainerRef} className="grid-container grid-open">
      <div className="header">
        <Navbar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle}/>
      </div>
      <div className="sidebar" style={{display: isSidebarOpen ? '': 'none'}}>
        <Sidebar isSidebarOpen={isSidebarOpen} toogleSidebar={handleSidebarToggle}/>
      </div>
      <div className="main-content">Main Content</div>
    </div>
    )
}

//loader function
export async function Sidebarloader() {

}