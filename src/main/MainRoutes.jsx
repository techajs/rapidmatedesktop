import React from 'react'
import {
    Home,
    Login,
    ProfileChoose,
    DeliveryboySignup,
    EnterpriseSignup,
    PickupSignup,
    CommonDashboard,
    SingupVerify,
    EnterprisePlanning,
    EnterprisesNewSchedule,
    AddPickupDetails,
    OrderView,
    PaymentView,
    AddVehicle,
    AddWorkType,
} from "../common/pages"
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import ProtectedRoute from '../utils/ProtectedRoute'; 
import { useSelector } from 'react-redux';
import ThankPage from '../common/ThankPage';
function MainRoutes() {
  const userRole=useSelector((state) => state.auth.role)
  const baseUrl=userRole?.toLowerCase().replace(/_/g, '');
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile-choose" element={<ProfileChoose />} />
            <Route path="/pickup-signup" element={<PickupSignup />} />
            <Route path="/enterprises-signup" element={<EnterpriseSignup />} />
            <Route path="/deliveryboy-signup" element={<DeliveryboySignup />} />
            <Route path="/signup-verify" element={<SingupVerify />} />
            <Route path="/thanks" element={<ThankPage baseUrl={baseUrl} />} />
            {/* auth route */}
            <Route path={`/${baseUrl}/dashboard`} element={<ProtectedRoute requiredRole={userRole}><CommonDashboard/></ProtectedRoute>} />
            {/* enterprise */}
            <Route path={`/${baseUrl}/planing`} element={<ProtectedRoute requiredRole={userRole}><EnterprisePlanning/></ProtectedRoute>} />
            <Route path={`/${baseUrl}/schedules`} element={<ProtectedRoute requiredRole={userRole}><EnterprisesNewSchedule/></ProtectedRoute>} />
          {/* end here */}
          {/* consumer */}
          <Route path={`/${baseUrl}/pickup-details`} element={<ProtectedRoute requiredRole={userRole}><AddPickupDetails/></ProtectedRoute>} />
          <Route path={`/${baseUrl}/order-preview`} element={<ProtectedRoute requiredRole={userRole}><OrderView/></ProtectedRoute>} />
          <Route path={`/${baseUrl}/payment`} element={<ProtectedRoute requiredRole={userRole}><PaymentView/></ProtectedRoute>} />
          {/*deliveryboy*/}
          <Route path={`/${baseUrl}/add-vehicle`} element={<ProtectedRoute requiredRole={userRole}><AddVehicle/></ProtectedRoute>} />
          <Route path={`/${baseUrl}/add-work-type`} element={<ProtectedRoute requiredRole={userRole}><AddWorkType/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
  )
}
export default MainRoutes
