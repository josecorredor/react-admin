import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../models/user";


const Nav = (props: {user: User}) => { 

    const logout = async () => {
        await axios.post('logout', {});
    }
        return(
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <Link to="/profile" className="nav-link px-3">Hi, {props.user.namec}</Link>
                    </div>
                </div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <Link to="/login" className="nav-link px-3" onClick={logout}>Sign out</Link>
                    </div>
                </div>
            </header>
        );

}


export default connect(
    (state: { user:User}) => {
    return {
        user: state.user
    }

})(Nav);