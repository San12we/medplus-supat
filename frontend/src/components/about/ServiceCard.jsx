import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import './about.css';
const ServiceCard = ({ title, details, icon, link }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the card is in view
  });

  return (
<div
  ref={ref}
  className={`w-full md:w-1/2 p-8 bg-blue-200 ${
    inView ? "animate-fadeIn" : "opacity-0"
  }`}
>
      <div className="bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
            <img src={icon} alt={title} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 text-center mb-2">{title}</h3>
          <p className=" text-lg text-center text-slate-950 dark:text-slat-900">{details}</p>
          <a href="/services" className="text-blue-600">{link}</a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
