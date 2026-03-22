import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">Contact Me</h2>
          <p className="text-lg text-secondary">
            Feel free to reach out for any inquiries or collaboration
            opportunities!
          </p>
        </div>

        {/* Contact Form */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium text-secondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-xl font-medium text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="mt-4 text-center text-lg text-green-600">
                  ✅ Message Sent Successfully!
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-lg text-red-500">
                  ❌ Error Sending Message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Or reach me at
          </h3>
          <p className="text-lg">
            Email:{" "}
            <a href="mailto:saamsallvin@gmail.com" className="text-primary">
              saamsallvin@gmail.com
            </a>
          </p>
          <p className="mt-4">
            <a
              href="/Saam-Sheron-Software-dev.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-primary underline hover:text-secondary transition duration-300">
              View My Resume
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
