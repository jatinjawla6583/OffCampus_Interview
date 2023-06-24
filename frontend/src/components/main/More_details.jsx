import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const More_details = () => {

    const { driveid } = useParams()
    const [drive, setDrive] = useState([])

    const moreDetails = async () => {

        // console.log(id);

        const res = await fetch('http://localhost:5000/add_jobs/getbyid/' + driveid)
        console.log(res.status);
        if (res.status === 200) {
            const data = await res.json()
            setDrive(data)
            console.log(data);
        }
    }

    useEffect(() => {
        moreDetails();
    }, [])








    const displayDetails = () => {
        return (
            <div className="card border border-success">
                <div className="card-body">
                    <h2 className="card-title">{drive.jobType}</h2>

                    <div className="row">
                        <div className='col-md-8'>
                            <p className="card-text">
                                <b>Registration Link :</b> {drive.reg_Link} sq feet
                            </p>
                            <p className="card-text">
                                <b>Last Date</b> {drive.lastDate} 
                            </p>
                            <p className="card-text">
                                <b>Course and Branch :</b> {drive.course_branch}
                            </p>
                            <p className="card-text">
                                <b>Batch :</b> {drive.batch}
                            </p>
                            <p className="card-text">
                                <b>Salary :</b> {drive.salary}
                            </p>
                            <p className="card-text">
                                <b>Designation :</b> {drive.designation}
                            </p>
                            <p className="card-text">
                                <b>Responsibility :</b> {drive.roles_responsibility}
                            </p>
                            <p className="card-text">
                                <b>Selection Process :</b> {drive.selectionProcess}
                            </p>
                            <p className="card-text">
                                <b>Interview Location :</b> {drive.interviewLocation}
                            </p>
                            <p className="card-text">
                                <b>Skills Required :</b> {drive.skillsRequired}
                            </p>
                        </div>

                        {/* <div className="col-md-4 ">
                            <img src={'http://localhost:5000/' + space.image} alt=""
                                className='w-100 rounded-5' />
                        </div> */}
                    </div>

                    {/* <button type="button" className="btn btn-primary">
                Button
              </button> */}
                </div>
            </div>
        )
    }

    return (
        <div style={{minHeight: '100vh', backgroundSize: 'cover', backgroundImage: `url('https://i.ytimg.com/vi/Gt50EPvMzXc/maxresdefault.jpg')`}}>

        <div className='container pt-5'>
            {displayDetails()}
        </div>
        </div>
    )
}

export default More_details