// Import React, useState, useEffect, and Link
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AutoplayCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState('slide-left');
  const slides = [
    {
      img: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993049/image3_b7pxgc.jpg",
      title: "Welcome to Medplus Health",
      subtitle: "Connecting Patients with Trusted Medical Professionals"
    },
    {
      img: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993048/image2_l4qa43.jpg",
      title: "Join a Network of Medical Professionals",
      subtitle: "Connect, Collaborate and share knowledge to enhance overall health"
    },
    {
      img: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1715100264/cdb1reaaf5jwvcnx2z9c.jpg",
      title: "Medplus Health",
      subtitle: "Bridging Healthcare"
    },
    // Add more slides as needed
  ];

  const handleNextSlide = () => {
    const styles = ['slide-left', 'slide-right', 'fade'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setTransitionStyle(randomStyle);
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleNextSlide, 10000);

    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  return (
    <div className="carousel w-full h-[300px]  relative">
      <div className="carousel-track relative overflow-hidden bg-black bg-opacity-50 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute top-0 left-0 w-full h-full transition duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } ${transitionStyle}`}
          >
            <img src={slide.img} className="w-full h-full object-cover" alt={slide.title} style={{ opacity: '0.8' }} />
            <div className="absolute flex justify-center items-center w-full h-full mt-8 ">
              <div className="text-white text-center">
                <h1 className="text-xl text-white font-sans font-bold bg-clip-text animate-gradient">{slide.title}</h1>
                <p className="text-sm text-white font-bold ">{slide.subtitle}</p>
                <div className="mt-8 flex gap-2 justify-center">
                  <button class="btn bg-blue-600 text-white">Learn More</button>
                  <button class="btn bg-orange-500 text-white">Contact us</button>
                </div>
              </div>
            </div>
            {/* Overlay to improve text visibility */}
          
          </div>
        ))}
      </div>
      
      {/* Dots */}
      <div className="flex justify-center mt-4 absolute bottom-0 w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AutoplayCarousel;
