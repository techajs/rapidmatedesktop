import React from 'react'
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
    HomeFooter
} from '../common/pages'
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

      {/* Our services Start here  */}
      <Services />

      {/* Why choose us section start here  */}
      <WhyChooseus />

      {/* Testimonial Start Here  */}
      <HomeTestimonial/>

      {/* Latest Blog Section Start here  */}
      <HomeBlog />

      {/* FAQs Section Start Here  */}
      <Faq />

      {/* Contact Form Section Start Here  */}
      <HomeContact />

      {/* Download Moblie App Section Start Here  */}
      <DownloadMobileApp />

      {/* Logo Slider Start Here  */}
      <LogoSlider />

      {/* Footer Section start here  */}
      <HomeFooter />
    </>
  )
}

export default Home
