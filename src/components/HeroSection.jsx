import React from "react";
import HomeImage from "../assets/images/dp-bg-reg.png"; // Make sure to replace this with your actual image path

const HeroSection = () => {
  return (
    <section className="bg-[#F4F4F4] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-secondary mb-4">
              Saam Sheron
            </h1>
            <p className="text-xl font-semibold text-[#606060] mb-4">
              Software Developer. UI Designer
            </p>
            <p className="text-secondary mb-6">
              I believe great things can be achieved through the use of
              technology and research. But those are merely the tools. Behind
              the tools are the people. Teamwork and passion, those are what
              matter the most.
            </p>
            {/* Call to Action Button */}
            <a
              href="#resume"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-[#FF3D30] transition-all"
              title="Download Resume">
              Download Resume
            </a>
          </div>

          {/* Right Section - Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={HomeImage}
              alt="Saam Sheron - Software Developer"
              className="w-full h-auto rounded-lg shadow-lg"
              title="Saam Sheron"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;