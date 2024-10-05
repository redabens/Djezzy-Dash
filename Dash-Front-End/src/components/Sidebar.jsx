import { useState, useEffect} from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LogoDjezzy from "../components/LogoDjezzy";
import {v4 as uuid} from 'uuid';
import "../styles/Sidebar.css";

function Sidebar({ toogleSidebar, isSidebarOpen, rotating,user }) {
  // Utiliser `user?.categories` pour éviter les erreurs si `user` ou `user.categories` est indéfini
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user && user.categories) {
      let liste = user.categories.map((category) => {
        return {
          id: uuid(),
          name: category,
          selected: false,
        };
      });
      liste = [...liste,
        {
          id: uuid(),
          name: "Technology",
          selected: false,
        },
        {
          id: uuid(),
          name: "Science",
          selected: false,
        },
        {
          id: uuid(),
          name: "Health",
          selected: false,
        },
        {
          id: uuid(),
          name: "Business",
          selected: false,
        },
        {
          id: uuid(),
          name: "Entertainment",
          selected: false,
        },
        {
          id: uuid(),
          name: "Sports",
          selected: false,
        },
        {
          id: uuid(),
          name: "Education",
          selected: false,
        },
        {
          id: uuid(),
          name: "Travel",
          selected: false,
        },
        {
          id: uuid(),
          name: "Food",
          selected: false,
        },
        {
          id: uuid(),
          name: "Fashion",
          selected: false,
        },
        {
          id: uuid(),
          name: "Finance",
          selected: false,
        },
        {
          id: uuid(),
          name: "Lifestyle",
          selected: false,
        },
        {
          id: uuid(),
          name: "Politics",
          selected: false,
        },
        {
          id: uuid(),
          name: "Environment",
          selected: false,
        },
        {
          id: uuid(),
          name: "History",
          selected: false,
        },
      ];
      console.log(liste);
      setCategories(liste);
    }
  }, [user]);
  const handleCategoryClick = (id) => {
    setCategories((prev) =>
      prev.map(
        (category) =>
          category.id === id
            ? { ...category, selected: true }
            : { ...category, selected: false } 
      )
    );
  };
  return (
    <>
      <div className="menubt" onClick={toogleSidebar}>
        <img
          src="/assets/Menu.svg"
          alt="menu"
          style={{ width: "20px", height: "20px" }}
        />
        {isSidebarOpen && <LogoDjezzy rotating={rotating} />}
      </div>
      <div className="categories">
        <div className="categories-list">
          {categories.map((category) => (
            <NavLink
             to={`/${category.name}`}
              key={category.id}
              className={`category-button ${
                category.selected ? "selected" : "none-selected"
              }`}
              activeclassname="active"
              onClick={() => {
                handleCategoryClick(category.id)
              }}
              style={
                category.selected
                  ? {
                      backgroundColor: "white",
                      color: "#6E099D",
                    }
                  : { backgroundColor: "#d1d1ea", color: "#424242" }
              }
            >
              <img
                src={
                  category.selected
                    ? "/assets/selected_dashboard.svg"
                    : "/assets/unselected_dashboard.svg"
                }
                alt="dashboard_icon"
                className="dashboard-icon"
              />
  
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="fixed-categories">
        <div className="deconnexion">
          <img
            src="/assets/logo_deconnexion.svg"
            alt="logo_deconnexion"
            style={{ width: "20px", height: "20px" }}
          />
          <span>Déconnexion</span>
        </div>
      </div>
    </>
  );
}


//Définir les PropTypes pour le composant
Sidebar.propTypes = {
  toogleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  rotating: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
export default Sidebar;
