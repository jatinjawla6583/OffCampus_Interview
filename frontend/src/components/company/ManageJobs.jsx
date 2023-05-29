import React, { useEffect, useState } from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const ManageJobs = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    console.log(currentUser);

    const [jobData, setJobData] = useState([])
    const [compData, setCompData] = useState([])
    // const [loading, setLoading] = useState(false)

    const fetchCompData = async () => {
        // setLoading(true);
        const res = await fetch('http://localhost:5000/profile/getbyuser/' + currentUser._id)
        // setLoading(false);
        console.log(res.status)
        // console.log(currentUser._id)

        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            setCompData(data)
        }
    }

    const fetchJobData = async () => {
        // setLoading(true);
        const res = await fetch('http://localhost:5000/add_jobs/getbyuser/' + currentUser._id)
        // setLoading(false);
        console.log(res.status)
        console.log(currentUser._id)

        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            setJobData(data)
        }
    }



    useEffect(() => {
        fetchCompData();
        fetchJobData();
    }, [])


    const displayDetails = () => {
        if (jobData && compData) {
            return (
                <div>
                    {
                        compData.map((comp) => (
                            <div className="card">
                                <div className="card-body">
                                    {/* <h5 className="card-title">Card title</h5> */}
                                    <div className="row">
                                        <div className="col-md-4 my-auto">
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={1}>
                                                    <p>{comp.comp_name}</p>
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </div>
                                        <div className="col-md-8">
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1'>
                                                    dfsfsdfsf
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }

    }


    return (

        <div className='container'>

            {/* <div className="card container">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 my-auto">
                            <MDBAccordion>
                                <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1'>

                                </MDBAccordionItem>
                            </MDBAccordion>
                        </div>
                        <div className="col-md-8">
                            <MDBAccordion>
                                <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1'>
                                    dfsfsdfsf
                                </MDBAccordionItem>
                            </MDBAccordion>
                        </div>
                    </div>
                </div>
            </div> */}

            {displayDetails()}

        </div>
    )

}

export default ManageJobs