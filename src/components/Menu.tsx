import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css';


const Menu = () => {
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={'/Dashboard'} >
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}to={'/Users'} >
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}to={'/roles'} >
                    Roles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}to={'/products'} >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}to={'/orders'} >
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}to={'/expenses'} >
                    Accounting
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
    )
}
// <NavLink className={({isActive}) => isActive ? "text-red-500": ""} to={'/Users'} >
export default Menu;