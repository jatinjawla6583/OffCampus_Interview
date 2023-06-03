import { Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import './style.css'


const Add_jobs = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('company')))
    console.log(currentUser);

    const jobData = async (formdata, { resetForm }) => {
        const res = await fetch('http://localhost:5000/add_jobs/add', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        console.log(res.status);

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Signed Successfully'
            })
            const data = await res.json();
            console.log(data)
            resetForm();
        }
    }






    return (
        <div className='add_jobs_bg_image'>
            <div className="card w-75 mx-auto rounded-5">
                <div className="card-body">
                    <h1 className="card-title text-center">ADD YOUR JOB HERE</h1>

                    <Formik
                        initialValues={
                            {
                                jobType: "",
                                reg_Link: "",
                                lastDate: "",
                                course_branch: "",
                                batch: "",
                                salary: "",
                                designation: "",
                                roles_responsibility: "",
                                selectionProcess: "",
                                interviewLocation: "",
                                skillsRequired: "",
                                user: currentUser._id
                            }
                        }
                        onSubmit={jobData}
                    >
                        {
                            ({ values, handleChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    
                                    <div className="mt-3">
                                        <MDBInput label='Designation' id='designation'
                                            type='text' onChange={handleChange} value={values.designation} rows={4} />
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <MDBInput label='Job Type' id='jobType' type='text'
                                                onChange={handleChange} value={values.jobType} />
                                        </div>
                                        <div className="col-md-6">
                                            <MDBInput label='Last Date to Apply' id='lastDate' type='date'
                                                onChange={handleChange} value={values.lastDate} />
                                        </div>
                                    </div>


                                    <MDBInput className='mt-3' label='Registration Link' id='reg_Link' type='url'
                                        onChange={handleChange} value={values.reg_Link} />

                                   
                                    <div className="mt-3">
                                        <MDBTextArea label='Eligibility' id='course_branch'
                                            type='text' onChange={handleChange} value={values.course_branch} rows={4} />
                                    </div>

                                    <div className="mt-3">
                                        <MDBInput label='Salary' id='salary'
                                            type='text' onChange={handleChange} value={values.salary} rows={4} />
                                    </div>

                                    <div className="mt-3">
                                        <MDBTextArea label='Batch' id='batch'
                                            type='text' onChange={handleChange} value={values.batch} rows={4} />
                                    </div>

                                   

                                    <div className="mt-3">
                                        <MDBTextArea label='Roles and Responsibility' id='roles_responsibility'
                                            type='text' onChange={handleChange} value={values.roles_responsibility} rows={4} />
                                    </div>

                                    <div className="mt-3">
                                        <MDBTextArea label='Selection Process' id='selectionProcess'
                                            type='text' onChange={handleChange} value={values.selectionProcess} rows={4} />
                                    </div>

                                    <div className="mt-3">
                                        <MDBTextArea label='Interview Location' id='interviewLocation'
                                            type='text' onChange={handleChange} value={values.interviewLocation} rows={4} />
                                    </div>

                                    <div className="mt-3">
                                        <MDBTextArea label='Skill Required' id='skillsRequired'
                                            type='text' onChange={handleChange} value={values.skillsRequired} rows={4} />
                                    </div>

                                    <button type="submit" className="btn btn-success w-100 my-3">Submit</button>
                                </form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        </div>
    )
}

export default Add_jobs