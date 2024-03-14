import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configration from '../config/config';
import { useMetaMask } from "metamask-react";
import DataTable from "react-data-table-component";
import { BsFillFileBarGraphFill, BsArrowRight } from 'react-icons/bs';
import { AiOutlineArrowDown,AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import * as Yup from 'yup';
import { useFormik } from "formik";
import isempty from "is-empty"
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';


function Dashboard() {

  const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
  const [data, setData] = useState([]);
  const [refreshIndicator, setRefreshIndicator] = useState(0);
  const [plan, setPlan] = useState('')
  const [joiningAMT, setJoiningAMT] = useState('')
  const [month, setMonth] = useState('')
  const [network, setNetwork] = useState("Vibit")

  const [userData, setUserData] = useState([])
  const [columns, setColumns] = useState([]);
  const [formvalues, setformvalues] = useState({});
  const [errors, setErrors] = useState({});
  const [editerrors, setEditerrors] = useState({})
  const Navigate = useNavigate()
  


  const checkdashboard = () => {
    const gettoken = localStorage.getItem("token")
    if (!gettoken) {
      Navigate('/')
    }
  }

 

  const EditLevel = async (e) => {
    const userID = e.target.value;
    console.log('userID---', userID);
    const Approved = 'Approved';
    let res = await axios.post(`${configration.localhostBackend}get-single-plans`, { id: userID, plan, joiningAMT, network })
    // console.log("respomnse", res)
    if (res) {
      const value = res.data.data;
      setformvalues(value)
      console.log("res value", value.package)

    } else {
      alert("failed to update")
    }
  }



  const editTable = async (e) => {
    e.preventDefault()

    const validationErrors = {};

    if (!formvalues.package) {
      validationErrors.package = 'Package Cannot be empty';
    }


    if (!formvalues.joiningAMT) {
      validationErrors.joiningAMT = 'Amount  must be a number';
    } else if (formvalues.joiningAMT === '0') {
      validationErrors.joiningAMT = 'Zero (0) is not allowed';
    }

    if (!formvalues.month) {
      validationErrors.month = 'Month Cannot be empty';
    }


    if (!formvalues.network) {
      validationErrors.network = 'Network is required';
    }

    setEditerrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('ascsacasc', formvalues);
      let response = await axios.post(`${configration.localhostBackend}edit-plan`, formvalues)
      if (response) {
        const value = response.data.data;
        toast.success("Your Plan Updated..");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
      } else {
        toast.error("failed")
      }
    }

  }

  
  const DeleteTable = async (value) => {
    try {
      console.log('delete123', value);
  
      if (window.confirm('Are you sure you want to delete this entry?')) {
        // User clicked "OK"
        let response = await axios.post(`${configration.localhostBackend}delete-plan`, { _id: value });
  
        if (response) {
          const value = response.data.data
          console.log("Deleted successfully",value);
          // alert("Deleted successfully");
          toast.error("Your Plan Deleted..");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          console.log("Deletion failed");
        }
      } else {
        // User clicked "Cancel"
        console.log('Deletion canceled');
      }
    } catch (error) {
      console.error("Error during deletion:", error.message);
      toast.error("Deletion failed. Please try again.");
    }
  };

  const rejectWithdraw = async (e) => {
    const userID = e.target.value;
    const Rejected = 'Rejected';
    
  }

  const renderApproveButton = (status, id) => {
    if (status === 'Approved') {
      return (
        <button type="button" className="btn btn-success" disabled>
          transferred
        </button>
      );
    } else {
      return (
        <>
          <button type="button" class="btn btn-outline-light py-1 px-3 me-3" data-bs-toggle="modal" data-bs-target="#editModal" value={id} onClick={EditLevel}>
            Edit
          </button>

          <button type="button" className="btn btn-danger" value={id} onClick={() => DeleteTable(id)}>
            Delete
          </button><ToastContainer/>
        </>
      );
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation functions
    const validatePlan = () => {
      if (plan.trim() === '') {
        return 'Package is required';
      }
      return '';
    };

    const validateJoiningAMT = () => {
      if (!joiningAMT || isNaN(joiningAMT)) {
        return 'Joining Amount must be a number';
      } else if (joiningAMT === '0') {
        return 'Zero (0) is not allowed';
      } else if (/[^0-9.]/.test(joiningAMT)) {
        return 'Alphabets characters are not allowed'
      }
      return '';
    };

    setErrors({});

    // Perform validation
    const planError = validatePlan();
    const joiningAMTError = validateJoiningAMT();

    // Update the errors state
    setErrors({
      plan: planError,
      joiningAMT: joiningAMTError
    });
    if (!planError && !joiningAMTError) {
      // Perform your form submission logic here
      await axios
        .post(`${configration.localhostBackend}add-plan`, {
          plan,
          joiningAMT,
          month,
          network,
        })
        .then((response) => {
          const server = response;
          toast.success("Your Plan Added..");
          setTimeout(() => {
            // window.location.reload();
          }, 1000000);
          window.location.reload();
        })
        .catch((error) => {
          console.log('error', error.message);
          alert('Failed to add your Plan..');
        });
    }
  };

  const columns2 = [
    { name: 'SNo', width:'5%', selector:(row) => row.sno },
    { name: 'Joining AMT', selector: (row) => row.joiningAMT },
    { name: 'Duration', selector: (row) => row.month },
    { name: 'Date',  width:'20%', selector: (row) => moment(row.dateTime).format("MMMM Do YYYY, h:mm:ss a")},
    { name: 'Network', selector: (row) => row.network },
    { name: 'Package',
    width:'10%', selector: (row) => row.package },
    {
      name: 'Approve', selector: (row) => row.status,
      width:'20%',
      cell: row => renderApproveButton(row.status, row.id)
    }
  ];

  function formatDate(dbdate) {
   const formattedData = dbdate.split('.')[0].replace('T', ' ')
    return formattedData; 
  }



  useEffect(() => {
    console.log(userData);
    axios.get(`${configration.localhostBackend}get-all-plans-admin`)
      .then((response) => {
        const table = response.data.data
        setUserData(table)

        const updatedWithdrawDetails = table
        .map((item, index) => ({
          sno: index + 1,
          joiningAMT: item.joiningAMT,
          month : item.month,
          dateTime: formatDate(item.dateTime),
          network: item.network,
          package: item.package,
          id: item._id
        }));

        setColumns(updatedWithdrawDetails)
      })
      .catch((error) => {
        console.log("error in Table", error.message)
      })
    checkdashboard()

    // withdraw()
  }, [])




  const updatedata = ((e) => {


    const { name, value } = e.target;

    // Apply replace(/\D/g, '') only to specific fields
    const cleanedValue =
      ["joiningAMT"].includes(name)
        ? value.replace(/[^0-9.]/g, '')
        : value;

    setformvalues({ ...formvalues, [name]: cleanedValue });

    // Clear the error message when the input value changes
    setEditerrors({ ...editerrors, [name]: '' });
  })

  return (
    <div className='dashboard-new-admin' style={{ marginLeft: "15px" }}>
        <nav class="navbar navbar-expand-lg py-3">
        <div className='container'>

            <h3 className='fw-bold '>ADMIN DASHBOARD</h3>
            <div className='ms-auto'>
              <Logout />
            </div>

            </div>
        </nav>
    

      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col">
            <div className='d-flex flex-row'>
              <div className='ms-auto'>
                <button type="submit" class="btn-add-new-items" data-bs-toggle="modal" data-bs-target="#createModal">+ NEW</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-4 pb-5">
        <div class="row justify-content-center">
          <div class="col">
            <h3>Package</h3>
            <DataTable
              columns={columns2}
              data={columns}
              defaultSortFieldId={1}
              sortIcon={<AiOutlineArrowDown />}
              pagination
              paginationPerPage={10} 
            />
          </div>
        </div>
      </div>
 


      <div class="modal fade edit-modal-design" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Your Details</h1>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <form>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Package
                  </label>
                  <input
                    type="text"
                    name="package"
                    className="form-control"
                    value={formvalues.package || ''}
                    onChange={updatedata}
                    id="formGroupExampleInput"
                  />
                  {editerrors.package && <span style={{ color: 'red' }}>{editerrors.package}</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput2" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="joiningAMT"
                    className="form-control"
                    value={formvalues.joiningAMT || ''}
                    onChange={updatedata}
                    id="formGroupExampleInput2"
                  />
                  {editerrors.joiningAMT && <span style={{ color: 'red' }}>{editerrors.joiningAMT}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Month
                  </label>
                  <input
                    type="text"
                    name="month"
                    className="form-control"
                    value={formvalues.month || ''}
                    onChange={updatedata}
                    id="formGroupExampleInput"
                  />
                  {editerrors.month && <span style={{ color: 'red' }}>{editerrors.month}</span>}
                </div>
                
                
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput2" className="form-label">
                    Network
                  </label>
                  <select
                    className="form-select"
                    name="network"
                    value={formvalues.network || ''}
                    onChange={updatedata}
                    aria-label="Default select example"
                  >
                    <option value="Vibit">Vibit</option>
                  </select>
                  {editerrors.network && <span style={{ color: 'red' }}>{editerrors.network}</span>}
                </div>
                <button
                  type="button"
                  className="btn btn-outline-success mt-3 mb-2"
                  onClick={editTable}
                >
                  Update
                </button>
                <ToastContainer/>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade edit-modal-design" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Enter Your Details</h1>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Package
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={plan}
                    onChange={(e) => {
                      setPlan(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, plan: '' }));
                    }}
                  />
                  {errors.plan && <span style={{ color: 'red' }}>{errors.plan}</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Joining Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={joiningAMT}
                    onChange={(e) => {
                      setJoiningAMT(e.target.value.replace(/[^0-9.]/g,''));
                      setErrors((prevErrors) => ({ ...prevErrors, joiningAMT: '' }));
                    }}
                  />
                  {errors.joiningAMT && <span style={{ color: 'red' }}>{errors.joiningAMT}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={month}
                    onChange={(e) => {
                      setMonth(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, month: '' }));
                    }}
                  />
                  {errors.month && <span style={{ color: 'red' }}>{errors.month}</span>}
                </div>
                
                
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Network
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="Vibit">Vibit</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: '#3B33D5', borderColor: '#3B33D5' }}
                >
                  Add
                </button>
                <ToastContainer/>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Dashboard;
