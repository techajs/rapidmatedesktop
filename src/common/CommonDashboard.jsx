import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';
import Dashboard from '../components/enterprise/Dashboard'
import ConsumerDashboard from '../components/consumer/ConsumerDashboard';
import DeliveryboyDashboard from '../components/deliveryboy/DeliveryboyDashboard';
import { UseFetch } from '../utils/UseFetch';
function CommonDashboard() {
  const user =UseFetch()
  // const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(user);
  const { userDetails } = { ...userData };
 
  return (
    <div>
        <CommonHeader userData={userData} />
        {userDetails?.role==='ENTERPRISE' && <Dashboard/>}
        {userDetails?.role==='CONSUMER' && <ConsumerDashboard/>}
        {userDetails?.role==='DELIVERY_BOY' && <DeliveryboyDashboard/>}
    </div>
  )
}

export default CommonDashboard
