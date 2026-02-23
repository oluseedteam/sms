import React from 'react'
import { FaLocationDot, FaEnvelope, FaPhone } from 'react-icons/fa6'
import adv1 from '../../assets/images/advantage_1.png'
import adv3 from '../../assets/images/advantage_3.png'
import adv4 from '../../assets/images/advantage_4.png'
import adv5 from '../../assets/images/advantage_5.jpg'
import welcome3 from '../../assets/images/welcome_image_3.png'
import img5 from '../../assets/images/image_5.png'

const Contact = () => {
  return (
    <div className="min-h-screen bg-white font-Dm-sans">
      {/* Hero Section with Image Grid */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0">
          <img src={adv3} className="w-full h-full object-cover" alt="" />
          <img src={adv1} className="w-full h-full object-cover" alt="" />
          <img src={welcome3} className="w-full h-full object-cover" alt="" />
          <img src={img5} className="w-full h-full object-cover" alt="" />
          <img src={adv5} className="w-full h-full object-cover" alt="" />
          <img src={adv4} className="w-full h-full object-cover" alt="" />
          <img src={adv3} className="w-full h-full object-cover" alt="" />
          <img src={adv1} className="w-full h-full object-cover" alt="" />
        </div>
        
        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0B1034] opacity-70"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg leading-relaxed opacity-90">
            We would love to hear from you. Whether you are interested in our admissions enquiry, requesting a school
            tour, or seeking more information, our team is ready to assist you. Reach out through any of the
            channels below — we respond promptly.
          </p>
        </div>
      </div>

      {/* Main Contact Content - Overlapping White Box */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
                  <div className="relative z-20 bg-white rounded-xl mt-24 p-8 md:p-12 grid md:grid-cols-2 gap-12">          
          {/* Left Column - Contact Information */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[#0B1034]">Get in touch with us.</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              We provide a complete service for the sale, purchases.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg text-[#0B1034] mb-3">Find us at</h3>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#3657C3] mt-1"><FaLocationDot /></span>
                  <span className="text-gray-600">1234 Post Avenue Remington</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-[#0B1034] mb-3">Reach out to us at</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-[#3657C3]"><FaEnvelope /></span>
                    <a href="mailto:contact@salespage.com" className="text-gray-600 hover:text-[#3657C3] transition-colors">
                      contact@salespage.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-[#3657C3]"><FaPhone /></span>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-[#3657C3] transition-colors">
                      +1234 567 890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#F8F9FB] p-6 md:p-10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-8 text-[#0B1034]">Contact Us Form</h2>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3657C3] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3657C3] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white"
                  placeholder="Complaint or Enquire"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3657C3] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white"
                  placeholder="Your Phone"
                />
                <input
                  type="email"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3657C3] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white"
                  placeholder="Email"
                />
              </div>

              <textarea
                rows="4"
                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3657C3] focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white resize-none"
                placeholder="Your Message"
              />

              <div className="flex items-center gap-3 px-1">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-5 h-5 text-[#3657C3] rounded border-gray-300 focus:ring-[#3657C3] cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-gray-500 cursor-pointer select-none">
                  I agree to the privacy policy
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#3657C3] text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
