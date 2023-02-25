import Head from "next/head";
import React,{Fragment} from "react"
import Dashboard from "../../components/Dashboard/Dashboard";

const MainDashboard = () => {
      
      
  return (
    <Fragment>
           <Head>
        <title> Citizen Protection Service || Dashboard</title>
      </Head>
      <Dashboard/>
    </Fragment>
  )
};

export default MainDashboard;
