import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app_config from '../../config';

const All_Drives = () => {
  // const [allDrivesData, setAllDrivesData] = useState([]);
  const [allProfile, setAllProfile] = useState([]);

  const [loading, setLoading] = useState(false);

  const [allDrivesData, setAllDrivesData] = useState([]);

  const [companies, setCompanies] = useState([]);

  const [masterList, setMasterList] = useState([]);

  const { apiUrl } = app_config;

  function getCompanyData(list, key) {
    const uniqueValues = new Set();
    const result = [];

    for (const obj of list) {
      const value = obj[key];

      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        result.push({ companyName: obj.user.companyName, _id: obj.user._id, avatar: obj.user.avatar });
      }
    }

    return result;
  }

  const fetchAllDriveData = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/add_jobs/getall');
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setAllDrivesData(data);
      setLoading(false);
      let compList = getCompanyData(data, '_id');
      console.log(compList);
      setCompanies(compList);
      setMasterList(data);
    }
  };

  const fetchAllProfile = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/profile/getall');
    console.log(res.status);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setAllProfile(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDriveData();
    // fetchAllProfile();
  }, []);

  const displayDriveData = () => {
    if (!loading) {
      return allDrivesData.map((drive, index) => (
        <div className="col-md-6 col-xl-6 mb-5" key={drive._id}>
          <div className="card shadow-0 border rounded-3">
            <div className="card-body">
              <h3>Job Type : {drive.jobType}</h3>

              <div className="mt-1 mb-0 text-muted small">
                <span>Registration Link : {drive.reg_Link}</span>
              </div>
              <p className="text-truncate mb-4 mb-md-0">Last Date : {new Date(drive.lastDate).toLocaleDateString()}</p>
              <Link to={`/main/more_details/${drive._id}`} className='btn btn-primary mt-3'>View More</Link>
            </div>
          </div>
        </div>
      ));

      // allProfile.map((pro, index) => (

      //     <div className="row justify-content-center mb-3" key={pro._id}>
      //         <div className="col-md-12 col-xl-12">
      //             <div className="card shadow-0 border rounded-3">
      //                 <div className="card-body">
      //                     <div className="row">

      //                         {/* <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">

      //                             <div className="bg-image hover-zoom ripple rounded ripple-surface">
      //                                 <img
      //                                     // src={space.image ? space.image : "/images/space-placeholder.jpg"}
      //                                     src={'http://localhost:5000/' + space.image}
      //                                     className="w-100"
      //                                     alt=""
      //                                 />
      //                                 <a href="#!">
      //                                     <div className="hover-overlay">
      //                                         <div
      //                                             className="mask"
      //                                             style={{
      //                                                 backgroundColor: "rgba(253, 253, 253, 0.15)",
      //                                             }}
      //                                         />
      //                                     </div>
      //                                 </a>
      //                             </div>

      //                         </div> */}
      //                         <div className="col-md-6 col-lg-6 col-xl-6">
      //                             <h3>Name : {pro.comp_name}</h3>

      //                             <div className="my-2 mb-0 text-muted small">
      //                                 <span><b>Official Website :</b> {pro.comp_website}</span>

      //                             </div>

      //                             <p className="mb-4 mb-md-0">
      //                                 About Company : {pro.about_comp}
      //                             </p>
      //                         </div>

      //                         <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">

      //                             <div className="d-flex flex-column mt-4">
      //                                 <Link to={`/user/book/${pro._id}`} className="btn btn-primary btn-sm" type="button">
      //                                     Register Now
      //                                 </Link>
      //                                 <Link to={`/main/more_details/${pro._id}`}
      //                                     className="btn btn-outline-primary btn-sm mt-2"
      //                                     type="button"
      //                                 >
      //                                     More Details
      //                                 </Link>
      //                             </div>

      //                         </div>

      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>

      // ))
    } else {
      return <div>Loading...</div>;
    }
  };

  const filterDriveList = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'all') {
      setAllDrivesData(masterList);
    } else {
      let filteredList = masterList.filter((drive) => drive.jobType.toLowerCase().includes(e.target.value.toLowerCase));
      setAllDrivesData(filteredList);
    }
  };

  return (
    <div className="">
      <header className="bg-dark">
        <div className="container">
          <div className="container py-4">
            <h3 className="text-center display-4 fw-bold text-white">Upcoming Off Campus Drives</h3>
            <div className="row">
              <div className="col-md-3">
                <select className="form-control"></select>
              </div>
              <div className="col-md-6">
                <input className="form-control" onChange={filterDriveList} placeholder="Search Jobs" />
              </div>
              <div className="col-md-3">
                <select className="form-control"></select>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="row mt-5">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h4>Top Companies</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {companies.map((comp, index) => (
                  <li className="list-group-item" key={comp._id}>
                    <img className="img-fluid" src={apiUrl + '/' + comp.avatar} alt="" style={{ height: '50px' }} />
                    <h3>{comp.companyName}</h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">{displayDriveData()}</div>
        </div>
      </div>
    </div>
  );
};

export default All_Drives;
