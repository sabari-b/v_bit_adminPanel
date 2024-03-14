import React, { useEffect, useState } from "react";
import axios from "axios";
import configration from "../config/config";
import Logout from "./logout";
import DataTable from "react-data-table-component";


const History = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalData, setTotalData] = useState("")
  const [fetchDatastart,setfetchDatastart] = useState(0);


  const columns = [
    { name:"sno", selector:(row) => row.sno},
    { name: "UserId", width:'9%',selector: (row) =>  row.userID },
    { name: "ReferralId", selector: (row) => row.referenceID },
    { name: "Useraddress",width:'38%', selector: (row) => row.user_address },
    { name: "StakeAmount", selector:(row) => <><span> {row.amount} VBIT</span></>},
    { name: "rewardAmount", width:'9%', selector: (row) => row.rewardAmount == undefined ?
        <><span>0</span></>:
        <><span>{row.rewardAmount}</span></>
    },
    {
      name: "Enable/Disable",
      width: "12%",
      selector: (row) => {
        return (
          <>
            {row.userlenarr > 1 ? (
              <>
                {
                  row.sno !== 1 ? (
                    <>
                      <span></span>
                    </>
                  ):(
                    <>
                    {row.status === "disable" ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-success py-1 px-3 me-3"
                          onClick={() => buttondisable(row.user_address, "enable")}
                        >
                          ENABLE
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => buttondisable(row.user_address, "disable")}
                        >
                          DISABLE
                        </button>
                      </>
                    )}
                  </>
                  )
                }
              </>
            ) : (
              <>
                {row.status === "disable" ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-success py-1 px-3 me-3"
                      onClick={() => buttondisable(row.user_address, "enable")}
                    >
                      ENABLE
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => buttondisable(row.user_address, "disable")}
                    >
                      DISABLE
                    </button>
                  </>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];


  async function buttondisable(usraddr,status) {
    let response = await axios.post(
      `${configration.localhostBackend}rewarddisable`,{
        usraddr : usraddr,
        status : status
      });
      if (response.status === 200) { 
        if(fetchDatastart === 2) {
          await fetchsearch()
        }
        else {
          await fetchData()
        }
      }
  }

  async function fetchsearch() {
    try {
        let response = await axios.post(
          `${configration.localhostBackend}getalluserdetails`,{
            search : searchQuery
          });
        if (response.status === 200) { 
          let datares = response.data.data;
          const result = datares.map((item) => {
            const occurrences = datares.filter((el) => el.user_address === item.user_address).length;
            return { ...item, userlenarr: occurrences.toString()};
          });
          const updatedWithdrawDetails = result
            .map((item, index) => ({
              sno: index + 1,
              userID: item.userID,
              referenceID:item.referenceID,
              user_address:item.user_address,
              amount: item.amount,
              rewardAmount : item.rewardAmount,
              status: item.status,
              userlenarr : item.userlenarr
            }));
            setTotalData(updatedWithdrawDetails);
            setfetchDatastart(2)
          }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }
  

  async function fetchData() {
    try {
      let response = await axios.post(`${configration.localhostBackend}getalluserdetails`);
      if (response.status === 200) {
        let dataresult = response.data.data;
        const updatedsnoDetails = dataresult
            .map((item, index) => ({
              sno: index + 1,
              userID: item.userID,
              referenceID:item.referenceID,
              user_address:item.user_address,
              amount: item.amount,
              rewardAmount : item.rewardAmount,
              status: item.status
            }));
        setTotalData(updatedsnoDetails);
        setfetchDatastart(1)
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="transaction_history dashboard-new-admin">
      <div className="container-fluid" style={{ marginLeft: "12px" }}>
        <nav className="navbar navbar-expand-lg py-3">
          <div className="container">
            <h3 className="fw-bold ">Users Reward History</h3>
            <div className="ms-auto">
              <Logout />
            </div>
          </div>
        </nav>
        <div className="search-container pt-lg-5">
          <input
            type="text"
            placeholder="Search by Address / UserId"
            value={searchQuery}
            className="input-design"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button  onClick={fetchsearch} className='logout-button-dash ms-lg-3'> Search </button>
        </div>
        <br />
        <DataTable
          columns={columns}
          data={totalData}
          defaultSortFieldId={1}
          pagination
          paginationPerPage={10}
          className='table-dashboard'
        />
      </div>
    </div>
  );
};

export default History;