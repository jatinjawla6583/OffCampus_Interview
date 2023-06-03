import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const All_Drives = () => {

    // const [allDrivesData, setAllDrivesData] = useState([]);
    const [allProfile, setAllProfile] = useState([]);

    const [loading, setLoading] = useState(false);

    const [allDrivesData, setAllDrivesData] = useState([]);


    const fetchAllDriveData = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:5000/add_jobs/getall");
        console.log(res.status);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setAllDrivesData(data);
            setLoading(false);
        }
    };

    const fetchAllProfile = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:5000/profile/getall");
        console.log(res.status);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setAllProfile(data);
            setLoading(false);
        }
    };


    useEffect(() => {
        // fetchAllDriveData();
        fetchAllProfile();
    }, []);

    const displayDriveData = () => {
        if (!loading) {
            return (
                allDrivesData.map((drive, index) => (

                    <div className="row justify-content-center mb-3" key={drive._id}>
                        <div className="col-md-12 col-xl-12">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                {/* <img
                                                    // src={space.image ? space.image : "/images/space-placeholder.jpg"}
                                                    src={'http://localhost:5000/' + space.image}
                                                    className="w-100"
                                                    alt=""
                                                /> */}
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div
                                                            className="mask"
                                                            style={{
                                                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                                                            }}
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h3>Job Type : {drive.jobType}</h3>

                                            <div className="mt-1 mb-0 text-muted small">
                                                {/* <span className="text-primary"> • </span> */}
                                                <span>Registration Link : {drive.reg_Link}</span>

                                            </div>

                                            <p className="text-truncate mb-4 mb-md-0">
                                                Last Date : {drive.lastDate}
                                            </p>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">


                                            <div className="d-flex flex-column mt-4">
                                                {/* <Link to={`/user/book/${drive._id}`} className="btn btn-primary btn-sm" type="button">
                                                    Register Now
                                                </Link> */}
                                                <Link to={`/main/more_details/${drive._id}`}
                                                    className="btn btn-outline-primary btn-sm mt-2"
                                                    type="button"
                                                >
                                                    More Details
                                                </Link>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))


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
            );
        } else {
            return <div>Loading...</div>;
        }
    };





    return (
        <div className='container'>
            {displayDriveData()}
        </div>
    )
}

export default All_Drives