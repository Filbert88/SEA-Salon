"use client";
import React from "react";
import Slider from "react-slick";
import Card from "@/components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface service{
    name:string;
    id: number | null;
    imageUrl: string | null;
}
interface servicesProps{
    services: service[]
}

export default function ServicePage({services} : servicesProps) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-32 mb-32 px-10">
      <h1 className="text-5xl text-center font-bold mb-8 text-white">Our Services</h1>
      <Slider {...settings}>
        {services.map((card) => (
          <div key={card.id} className="px-2">
            <Card title={card.name} href={card.name} imageUrl={card.imageUrl}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}
