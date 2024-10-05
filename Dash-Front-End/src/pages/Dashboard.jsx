import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css"
import { Graph2 } from "../components/Graphs";

export default function Dashboard() {
  const location = useLocation();
  const category = location.pathname.slice(1);
  const token = sessionStorage.getItem("token");
  const [dashboards, setDashboards] = useState([]);
  useEffect(()=>{
    const fetchDashboards = async ()=>{
      axios.get(`http://localhost:3000/dashboard/${category}`,{
        headers:{
          'Authorization':token,
        }
      })
      .then((res)=>{
        if(res.status === 200){
          setDashboards(res.data.dashboards);
        }
      })
      .catch ((error)=>{
        if(error.response){
          alert(error.response.data.message);
        }
      })
    }  
    fetchDashboards();
  },[category])
  return (
    <>
      {dashboards.length !== 0 ?dashboards.map((dashboard)=>{
          return (<div key={dashboard.name} className="dashes">
            <iframe
              src={`http://localhost:3000/${dashboard.url.slice(1)}/`}
              title={dashboard.name}
            />
          </div>);
      }):(<div key='graph1' className="dashes">
        <iframe
          src={`http://localhost:3000/graph1/`}
          title='graph1'
        />
      </div>)}
    </>
  );
}
