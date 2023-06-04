import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import app_config from '../../config';

const Company_profile = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('company')));

  const { apiUrl } = app_config;

  const updateProfile = async (data) => {
    console.log(data);
    const res = await fetch(apiUrl + '/company/update/' + currentUser._id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.status);
    const userdata = await res.json();
    if(res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
    }
    console.log(userdata);
    setCurrentUser(userdata);
    sessionStorage.setItem('company', JSON.stringify(userdata));
  };

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    // setSelImage(file.name);
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(apiUrl + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
        updateProfile({ avatar: file.name });
      }
    });
  };

  const deleteAccount = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
    return;
  };

  const profileForm = useFormik({
    initialValues: currentUser,
    onSubmit: updateProfile
  });

  return (
    <div>
      <section className="vh-100 h-custom" style={{ backgroundColor: '#8fc4b7' }}>
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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">COMPANY DETAILS HERE</h3>

                  <form onSubmit={profileForm.handleSubmit}>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Company Logo
                      </label>
                      <input type="file" className="form-control"  onChange={uploadProfileImage} />
                      <label className="form-label" htmlFor="form3Example1q">
                        Company Name
                      </label>
                      <input type="text" id="companyName" className="form-control" value={profileForm.values.companyName} onChange={profileForm.handleChange} />
                    </div>

                    {/* <div className="row mb-4 pb-2 pb-md-0 mb-md-5"> */}
                    <div className="col-md-6 w-100 mb-4">
                      <div className="">
                        <label className="form-label" htmlFor="form3Example1w">
                          Official Website
                        </label>
                        <input type="url" id="officalWebsite" className="form-control" value={profileForm.values.officalWebsite} onChange={profileForm.handleChange} />

                        {/* </div> */}
                      </div>
                    </div>

                    <div className="">
                      <label className="form-label" htmlFor="textAreaExample">
                        About Company
                      </label>
                      <textarea className="form-control" id="about" rows={4} value={profileForm.values.about} onChange={profileForm.handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success w-100 my-4">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company_profile;
