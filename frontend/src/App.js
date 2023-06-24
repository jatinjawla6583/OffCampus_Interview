import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/main';
import Login from './components/main/Login';
import Home from './components/main/Home';
import SignUp from './components/main/SignUp';
import Add_jobs from './components/company/Add_jobs';
import ManageJobs from './components/company/ManageJobs';
import UserProvider from './context/UserProvider';
import UserAuth from './auth/UserAuth';
import All_Drives from './components/main/All_Drives';
import Company from './components/company';
import More_details from './components/main/More_details';
import Company_profile from './components/company/Company_profile';
import CompanyLogin from './components/main/CompanyLogin';
import CompanySignUp from './components/main/CompanySignUp';
import ListCompanies from './components/main/ListCompanies';
import CompanyAuth from './auth/CompanyAuth';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/main/home" />} />
          <Route element={<Main />} path="main">
            <Route element={<Home />} path="home" />
            <Route element={<Login />} path="login" />
            <Route element={<SignUp />} path="signup" />
            <Route element={<CompanyLogin />} path="companylogin" />
            <Route element={<CompanySignUp />} path="companysignup" />
            <Route element={<All_Drives />} path="all_drives" />
            <Route element={<ListCompanies />} path="companylist" />
            <Route element={<More_details />} path="more_details/:driveid" />
          </Route>
          {/* <Route element={<UserAuth><Company /></UserAuth>} path='company'/> */}
          <Route
            element={
              <CompanyAuth>
                {' '}
                <Company />{' '}
              </CompanyAuth>
            }
            path="company"
          >
            <Route element={<Add_jobs />} path="add_job" />
            <Route element={<Company_profile />} path="Company_profile" />
            <Route element={<ManageJobs />} path="manage_job" />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
