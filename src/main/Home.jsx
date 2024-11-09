import React from "react";
import {
  HomeHeader,
  HomeBannerCard,
  ServicesTypesCard,
  HomeAboutus,
  CompanyAchivments,
  Services,
  WhyChooseus,
  HomeTestimonial,
  HomeBlog,
  Faq,
  HomeContact,
  DownloadMobileApp,
  LogoSlider,
  HomeFooter,
  HomeOnDemandCard,
  HomeTrackOrderCard,
  HomeChooseDeliveryVehicleCard,
  HomeSecurePaymentCard,
  HomeTalkToTeam,
  HomeEcoFriendlyFleetCard,
} from "../common/pages";
import TrackOrder from "../assets/images/RealTimeHomeTracking.png";
import ShiftBasedDelivery from "../assets/images/HomeShiftBasedDelivery.png";
import PaymentImg from "../assets/images/HomePaymentImg.png";
import SpecializedVehicle from "../assets/images/SpecializedVehicleAssistance.png";
// import "../assets/css/home.css";

function Home() {
  return (
    <>
      {/* Header Start Here  */}
      <HomeHeader />
      {/* Header End Here  */}

      {/* Main Home Banner Section start here  */}
      <HomeBannerCard />

      {/* Home Cards Section start here  */}
      <ServicesTypesCard />

      {/* About us section start here  */}
      <HomeAboutus />

      {/* Home Companies trust us Section start here  */}
      <CompanyAchivments />

      {/* Home OnDemandCard Card Start Here  */}
      <HomeOnDemandCard />

      {/* Home TrackOrderCard Start Here  */}
      <HomeTrackOrderCard
        title="Track Your Orders in Real Time"
        description="Stay updated with live delivery tracking and status notifications."
        imageSrc={TrackOrder}
      />

      {/* Home ChooseDeliveryVehicleCard Start Here  */}
      <HomeChooseDeliveryVehicleCard />

      {/* Home EfficientCard Start Here  */}
      <HomeTrackOrderCard
        title="Efficient Shift-Based Deliveries"
        description="For restaurants and businesses needing dedicated delivery personnel"
        imageSrc={ShiftBasedDelivery}
      />
      <HomeSecurePaymentCard
        title="Secure Payments & Easy Booking"
        description="Multiple payment options with easy, secure checkout"
        imageSrc={PaymentImg}
      />

      <HomeTrackOrderCard
        title="Specialized Vehicle Assistance"
        description="Our depannage service is there when your vehicle needs transportation to the garage"
        imageSrc={SpecializedVehicle}
      />

      {/* Home Talk To Team Section Start Here  */}
      <HomeTalkToTeam/>

      {/* Home Eco Friendly FleetCard Start Here  */}
      <HomeEcoFriendlyFleetCard/>

      {/* <Services />
      <WhyChooseus />
      <HomeTestimonial/>
      <HomeBlog />
      <Faq />
      <HomeContact />
      <DownloadMobileApp />
      <LogoSlider /> */}

      {/* Footer Section start here  */}
      <HomeFooter />
    </>
  );
}

export default Home;
