import React, { useEffect, useState } from 'react';
import app_config from '../../config';
import Swal from 'sweetalert2';

const ListCompanies = () => {
  const { apiUrl } = app_config;
  const [companyList, setCompanyList] = useState([]);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const getCompanies = async () => {
    const response = await fetch(`${apiUrl}/company/getall`);
    const data = await response.json();
    setCompanyList(data);
    console.log(data);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const sendMail = async (to, subject, html) => {
    const res = await fetch(`${apiUrl}/util/sendMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, subject, html })
    });

    console.log(res.status);
  };

  const subscribe = async (id) => {
    if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!'
      });
      return;
    } else {
      const res = await fetch(`${apiUrl}/subscription/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: currentUser._id,
          company: id,
          createdAt: new Date()
        })
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Subscribed successfully!'
        });
      }
    }
  };

  const displayCompanies = () => {
    return companyList.map((company) => {
      return (
        <div className="col-md-3" key={company._id}>
          <div className="card">
            <div className="card-body">
              <div className="card-top" style={{ backgroundImage: `url('${apiUrl + '/' + company.avatar}')` }}></div>
              <h4>{company.name}</h4>
              <p>{company.description}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" onClick={(e) => subscribe(company._id)}>
                Subscribe
              </button>

              {/* <button
                onClick={(e) => {
                  sendMail(currentUser.email, 'Test Mail', '<h1>Test Mail</h1>');
                }}
              >
                Send Mail
              </button> */}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Companies</h1>
      <div className="container">
        <div className="row">{displayCompanies()}</div>
      </div>
    </div>
  );
};

export default ListCompanies;
