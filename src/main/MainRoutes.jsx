import React from "react";
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
  PastOrder,
  OrderDetail,
  ConsumerSetting,
  PickupAddressBook,
  PickupNotificationSettings,
  PickupPaymentMethods,
  PickupChangePassword,
  ContactUs,
  Restaurants,
  Grocery,
  Pharmacy,
  Gifts,
  Ecommerce,
  AboutUs,
} from "../common/pages";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import { useSelector } from "react-redux";
import ThankPage from "../common/ThankPage";
import RequestPending from "../common/RequestPending";
import { elements } from "chart.js";
import EnterpriseOneTimeSelectLocation from "../components/enterprise/EnterpriseOneTimeSelectLocation";
import EnterpriseOneTimeSelectServiceType from "../components/enterprise/EnterpriseOneTimeSelectServiceType";
import EnterpriseScheduleApproved from "../components/enterprise/EnterpriseScheduleApproved";
import EnterpriseMultipleDeliveriesSelectService from "../components/enterprise/EnterpriseMultipleDeliveriesSelectService";
import EnterpriseMultipleDeliverySelectLocation from "../components/enterprise/EnterpriseMultipleDeliverySelectLocation";
import DeliveryboyProfile from "../components/consumer/account/DeliveryboyProfile";
import SearchDriver from "../common/SearchDriver";
import LiveTracking from "../common/LiveTracking";
function MainRoutes() {
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/thanks" element={<ThankPage baseUrl={baseUrl} />} />
        <Route path="/request-pending" element={<RequestPending baseUrl={baseUrl} />} />
        {/* auth route */}
        <Route
          path={`/${baseUrl}/dashboard`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <CommonDashboard />
            </ProtectedRoute>
          }
        />
        {/* enterprise */}
        <Route
          path={`/${baseUrl}/planing`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterprisePlanning />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/schedules`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <EnterprisesNewSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprises-onetime-selectlocation"
          element={<EnterpriseOneTimeSelectLocation />}
        />
        <Route
          path="/enterprises-onetime-selectservicetype"
          element={<EnterpriseOneTimeSelectServiceType />}
        />
        <Route
          path="/enterprises-schedule-approved"
          element={<EnterpriseScheduleApproved />}
        />
        <Route
          path="/enterprises-multiple-deliveries-selectlocation"
          element={<EnterpriseMultipleDeliverySelectLocation />}
        />
        <Route
          path="/enterprises-multiple-deliveries-serviceselect"
          element={<EnterpriseMultipleDeliveriesSelectService />}
        />
        {/* end here */}
        {/* consumer */}
        <Route
          path={`/${baseUrl}/pickup-details`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddPickupDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/order-preview`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <OrderView />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/payment`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <PaymentView />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/consumer/find-driver`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <SearchDriver />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/consumer/order-tracking`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <LiveTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/past-order`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <PastOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/order-detail`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/setting`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <ConsumerSetting />
            </ProtectedRoute>
          }
        >
          <Route index element={<PickupAddressBook />} />
          <Route path="pickup-address-book" element={<PickupAddressBook />} />
          <Route
            path="pickup-notification-settings"
            element={<PickupNotificationSettings />}
          />
          <Route
            path="pickup-payment-methods"
            element={<PickupPaymentMethods />}
          />
          <Route
            path="pickup-change-password"
            element={<PickupChangePassword />}
          />
          <Route
            path="delivery-profile-type"
            element={<DeliveryboyProfile />}
          />
        </Route>
        {/*deliveryboy*/}
        <Route
          path={`/${baseUrl}/add-vehicle`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddVehicle />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${baseUrl}/add-work-type`}
          element={
            <ProtectedRoute requiredRole={userRole}>
              <AddWorkType />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}
export default MainRoutes;
