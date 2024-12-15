import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {/* Social Media Links */}
          <a
            href="https://github.com/saam-rgb"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-github text-2xl hover:text-secondary"></i>
          </a>
          <a
            href="https://linkedin.com/in/saam-sheron"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-linkedin text-2xl hover:text-secondary"></i>
          </a>
          <a
            href="https://twitter.com/saam_sheron"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-twitter text-2xl hover:text-secondary"></i>
          </a>
        </div>

        <p className="text-lg">
          &copy; {new Date().getFullYear()} Saam Sheron. All rights reserved.
        </p>
        <p className="text-sm">Designed & Developed by Saam Sheron</p>
      </div>
    </footer>
  );
};

export default Footer;