"use client"
import React from 'react';
import Slider from 'react-slick';
import MainService from "@/components/MainService";

const services = [
  {
    title: "Kerastase Ritual",
    desc: "The Kerastase Ritual refers to a personalized haircare treatment offered by the luxury haircare brand Kerastase.",
    imageUrl: "/tes.jpg",
  },
  {
    title: "Hydrating Therapy",
    desc: "Deep moisturizing treatments to revitalize dry and damaged hair, ensuring smooth and shiny results.",
    imageUrl: "/tes.jpg",
  },
  {
    title: "Color Enhancements",
    desc: "Premium coloring services using the best products to provide vibrant, long-lasting color while maintaining hair health.",
    imageUrl: "/tes.jpg",
  },
  {
    title: "Styling Sessions",
    desc: "From classic cuts to modern styling trends, our expert stylists create the perfect look for any occasion.",
    imageUrl: "/tes.jpg",
  },
  {
    title: "Scalp Treatments",
    desc: "Specialized treatments to cleanse, exfoliate, and nourish the scalp, promoting hair growth and health.",
    imageUrl: "/tes.jpg",
  },
];

export default function MainServiceWrapper() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container mx-auto">
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index}>
            <MainService title={service.title} desc={service.desc} imageUrl={service.imageUrl} />
          </div>
        ))}
      </Slider>
    </div>
  );
}