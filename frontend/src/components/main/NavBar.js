import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider';

const NavBar = () => {
  const { loggedIn, setLoggedIn, logout } = useUserContext();

  const showLoggedIn = () => {
    if (!loggedIn) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link text-white" aria-current="page" to="/main/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" aria-current="page" to="/main/signup">
              SignUp
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" aria-current="page" to="/main/companysignup">
              Company SignUp
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" aria-current="page" to="/main/companylogin">
              Company Login
            </NavLink>
          </li>
        </>
      );
    }
  };

  const showLogout = () => {
    if (loggedIn) {
      return (
        <li className="nav-item">
          <button className="btn btn-danger ms-3" aria-current="page" onClick={logout}>
            Logout
          </button>
        </li>
      );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
        {/* Container wrapper */}
        <div className="container text-white">
          <img src="https://cdn-icons-png.flaticon.com/512/1478/1478906.png" height="35" alt="MDB Logo" loading="lazy" />

          <h4>OFFCAMPUS INTERVIEW</h4>
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}

          <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
            {/* Left links */}
            <ul className="navbar-nav mb-2 mb-lg-0 fs-5">
              <li className="nav-item ">
                <NavLink className="nav-link text-white" aria-current="page" to="home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" aria-current="page" to="all_drives">
                  Placement Drives
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" aria-current="page" to="/main/companylist">
                  Get Notified
                </NavLink>
              </li>
              <li className="nav-item me-3 me-lg-0 dropdown">
                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/main/signup">
                      User Signup
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/main/login">
                      User Login
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-3 me-lg-0 dropdown">
                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  Company
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/main/companysignup">
                      Company Signup
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/main/companylogin">
                      Company Login
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Left links */}
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
    </div>
  );
};

export default NavBar;
