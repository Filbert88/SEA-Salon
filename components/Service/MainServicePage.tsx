"use client"
import React from 'react';
import Slider from 'react-slick';
import MainServiceComponent from './MainService';

interface service{
  name:string;
  id: number | null;
  imageUrl: string | null;
  description: string;
}

interface servicesProps{
  services: service[]
}

export default function MainServicePage({services}:servicesProps) {
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
            <MainServiceComponent title={service.name} desc={service.description} imageUrl={service.imageUrl || "/tes.jpg"} />
          </div>
        ))}
      </Slider>
    </div>
  );
}