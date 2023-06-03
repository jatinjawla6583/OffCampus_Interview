import React, { useEffect, useState } from 'react'
import app_config from '../../config'
import Swal from 'sweetalert2';

const ListCompanies = () => {

    const {apiUrl} = app_config;
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

    const sendMail = async (id) => {
        
    }

    const subscribe = async (id) => {
        if(!currentUser){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to login first!',
            })
            return;
        }else{
            const res = await fetch(`${apiUrl}/subscription/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: currentUser._id,
                    company: id,
                    createdAt: new Date(),
                }),
            });

            const data = await res.json();
            console.log(data);
            if(data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Subscribed successfully!',
                })
            }
        }
    }

    const displayCompanies = () => {
        return companyList.map((company) => {
            return (
                <div key={company._id}>
                    <h1>{company.name}</h1>
                    <h2>{company.description}</h2>

                    <button className='btn btn-primary' onClick={e => subscribe(company._id)}>Subscribe</button>
                </div>
            )
        })
    }

  return (
    <div>
        <h1>Companies</h1>
        {displayCompanies()}

    </div>
  )
}

export default ListCompanies