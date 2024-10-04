import { useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LogoDjezzy from "../components/LogoDjezzy";
import "../styles/Sidebar.css";

function Sidebar({ toogleSidebar, isSidebarOpen, rotating, handleRotate }) {
  const dashList = [
    {
      id: 1,
      name: "Dashboard data usage",
      selected: false,
      // handleClick: function () {
      //   console.log(`Category ID: ${this.id}, Name: ${this.name}`);
      //   setDashboards((prev) =>
      //     prev.map((dashboard) =>
      //       dashboard.id === this.id
      //         ? { ...dashboard, selected: !dashboard.selected }
      //         : dashboard
      //     )
      //   );
      // },
    },
    {
      id: 2,
      name: "Dashboard 2",
      selected: true,
    },
    {
      id: 3,
      name: "Dashboard 3",
      selected: false,
    },
    {
      id: 4,
      name: "Dashboard 4",
      selected: false,
    },
  ];
  const [dashborads, setDashboards] = useState(dashList);

  const handleDashboardClick = (id) => {
    setDashboards((prev) =>
      prev.map(
        (dashboard) =>
          dashboard.id === id
            ? { ...dashboard, selected: true }
            : { ...dashboard, selected: false } 
      )
    );
  };
  return (
    <div className="sidbar-s">
      <div className="menubt" onClick={toogleSidebar}>
        <img
          src="/assets/Menu.svg"
          alt="menu"
          style={{ width: "25px", height: "25px" }}
        />
        {isSidebarOpen && <LogoDjezzy rotating={rotating} />}
      </div>
      <div className="categories">
        {dashborads.map((dashboard) => (
          <NavLink
           to={`/${dashboard.name}`}
            key={dashboard.id}
            className={`category-button ${
              dashboard.selected ? "selected" : "none-selected"
            }`}
            activeclassname="active"
            onClick={() => handleDashboardClick(dashboard.id)}
            style={
              dashboard.selected
                ? {
                    backgroundColor: "white",
                    color: "#6E099D",
                  }
                : { backgroundColor: "#d1d1ea", color: "#424242" }
            }
          >
            <img
              src={
                dashboard.selected
                  ? "../public/assets/selected_dashboard.svg"
                  : "../public/assets/unselected_dashboard.svg"
              }
              alt="dashboard_icon"
              className="dashboard-icon"
            />

            {dashboard.name}
          </NavLink>
        ))}
      </div>
      <div className="fixed-categories">
        <div className="deconnexion">
          <img
            src="/assets/logo_deconnexion.svg"
            alt="logo_deconnexion"
            style={{ width: "23px", height: "23px" }}
          />
          <span>Déconnexion</span>
        </div>
      </div>
    </div>
  );
}

//loader function
export async function Sidebarloader() {
  axios.get("https://localhost:3000/categories").then();
}

//Définir les PropTypes pour le composant
Sidebar.propTypes = {
  toogleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};
export default Sidebar;
