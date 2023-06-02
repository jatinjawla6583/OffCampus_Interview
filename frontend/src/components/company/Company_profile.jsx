import { Formik } from 'formik';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const Company_profile = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('company')))
    console.log(currentUser);

    const profileData = async (formdata, { resetForm }) => {
        const res = await fetch('http://localhost:5000/profile/add', {
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
                text: 'Profile Submitted Successfully'
            })
            const data = await res.json();
            console.log(data)
            resetForm();
        }
    }


    return (
        <div>
            <section className="vh-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-8 col-xl-6">
                            <div className="card rounded-3">
                                {/* <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                                    className="w-100"
                                    style={{
                                        borderTopLeftRadius: ".3rem",
                                        borderTopRightRadius: ".3rem"
                                    }}
                                    alt="Sample photo"
                                /> */}
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">
                                        COMPANY DETAILS HERE
                                    </h3>

                                    <Formik
                                        initialValues={
                                            {
                                                comp_name: "",
                                                // comp_contact: "",
                                                comp_website: "",
                                                about_comp: "",
                                                user: currentUser._id
                                            }
                                        }
                                        onSubmit={profileData}
                                    >

                                        {
                                            ({ values, handleChange, handleSubmit }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <div className=" mb-4">
                                                        <label className="form-label" htmlFor="form3Example1q">
                                                            Company Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="comp_name"
                                                            className="form-control"
                                                            value={values.comp_name}
                                                            onChange={handleChange}
                                                        />

                                                    </div>
                                                    <div className="row">
                                                        {/* <div className="col-md-6 mb-4">
                                                            <div className=" datepicker">
                                                                <label htmlFor="exampleDatepicker1" className="form-label">
                                                                    Contact
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="comp_contact"
                                                                    value={values.comp_contact}
                                                                    onChange={handleChange}
                                                                />

                                                            </div>
                                                        </div> */}

                                                        {/* <div className="row mb-4 pb-2 pb-md-0 mb-md-5"> */}
                                                        <div className="col-md-6 w-100 mb-4">
                                                            <div className="">
                                                                <label className="form-label" htmlFor="form3Example1w">
                                                                    Official Website
                                                                </label>
                                                                <input
                                                                    type="url"
                                                                    id="comp_website"
                                                                    className="form-control"
                                                                    value={values.comp_website}
                                                                    onChange={handleChange}
                                                                />

                                                                {/* </div> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <label className="form-label" htmlFor="textAreaExample">
                                                            About Company
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="about_comp"
                                                            rows={4}
                                                            value={values.about_comp}
                                                            onChange={handleChange}
                                                        />

                                                    </div>




                                                    <button type="submit" className="btn btn-success w-100 my-4">
                                                        Submit
                                                    </button>
                                                </form>
                                            )
                                        }

                                    </Formik>





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Company_profile