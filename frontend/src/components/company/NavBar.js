import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserContext } from "../../context/UserProvider";

const NavBar = () => {
    const { loggedIn, setLoggedIn, logout } = useUserContext();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    // const showLoggedIn = () => {
    //     if (!loggedIn) {
    //         return (
    //             <>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" aria-current="page" to="/main/login">
    //                         Login
    //                     </NavLink>
    //                 </li>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" aria-current="page" to="/main/signup">
    //                         SignUp
    //                     </NavLink>
    //                 </li>
    //             </>
    //         );
    //     }
    // }

    const showLogout = () => {
        if (loggedIn) {
            return (
                <ul className="navbar-nav">
                    {/* // <li className="nav-item"> */}
                    {/* <button className="btn btn-danger ms-3" aria-current="page" onClick={logout}>
                        Logout
                    </button> */}
                    <button type="button" className="btn me-3 mb-2" style={{ backgroundColor: 'white' }} onClick={logout}>
                        <b>LogOut</b>
                    </button>
                    {/* <NavLink className="nav-link text-white" onClick={logout} type='button'>
                        <b>LOGOUT</b>
                    </NavLink> */}
                    {/* // </li> */}
                </ul>
            );
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'purple' }}>
                <div className="container">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1478/1478906.png"
                        height="35"
                        alt="MDB Logo"
                        loading="lazy"
                    />
                    <h4 className='text-white'>
                        OFFCAMPUS INTERVIEW
                    </h4>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav  fs-5">
                            {/* <NavLink className="nav-link text-white" aria-current="page" to="/main/home">
                                <b>HOME</b>
                            </NavLink> */}
                            <NavLink className="nav-link text-white" aria-current="page" to="/main/HOME">
                                <b>HOME</b>
                            </NavLink>
                            <NavLink className="nav-link text-white" aria-current="page" to="/company/company_profile">
                                <b>PROFILE</b>
                            </NavLink>
                            <NavLink className="nav-link text-white" aria-current="page" to="/company/add_job">
                                <b>ADD JOBS</b>
                            </NavLink>
                            <NavLink className="nav-link text-white" to="/company/manage_job">
                                <b>MANAGE JOBS</b>
                            </NavLink>
                            {/* <NavLink className="nav-link text-white" to="/user/profile">
                                <b>PROFILE</b>
                            </NavLink> */}
                            {/* <NavLink className="nav-link text-white" onClick={logout} type='button'>
                                <b>LOGOUT</b>
                            </NavLink> */}
                            {/* {showLoggedIn()} */}
                            {showLogout()}

                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar