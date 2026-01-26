import React, {useRef} from "react";
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom"

export default function ContactForrm() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
  'service_mk9004s',
  'template_ef0awf1',
  form.current,
  '1EDZzJVQU9AivIfmy'
)
.then(() => {
  alert('Message sent successfully!');
  form.current.reset();
})
.catch((error) => {
  alert('Failed to send message. Please try again.');
  console.error(error);
});

  };

  return (
    <section
      id="contact"
      className="flex items-center justify-center h-screen bg-black bg-linear-to-l from-purple-800 via-black to-purple-900 text-white"
    >
        <div className="flex flex-wrap justify-center items-center w-full max-w-[1100px] gap-8">
       
        <div className="flex-1 min-w-[320px] flex justify-center">
    
            
          <form ref={form}
            id="contact-form"
            onSubmit={sendEmail}
            className="bg-transparent border border-white  p-8 rounded shadow-custom w-full max-w-[600px] text-white"
          >
            

            <label className="block font-bold mb-2" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-3 border-none rounded-lg bg-white text-gray-600 text-base mb-5 transition-all duration-300 placeholder:text-light-pink focus:outline-none"
            />

            <label className="block font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border-none rounded-lg bg-white text-gray-600 text-base mb-5 transition-all duration-300 placeholder:text-light-pink"
            />

            <label className="block font-bold mb-2" htmlFor="subject">
            Subject
            </label>

            <select
            id="subject"
            name="subject"
            required
            className="w-full p-3 border-none rounded-lg bg-white text-gray-600 text-base mb-5 transition-all duration-300 placeholder:text-light-pink"
            >
            <option value="">Select a category</option>
            <option value="Delivery">Delivery</option>
            <option value="Waste collection">Waste Collection</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Repairs">Repairs</option>
            <option value="Other">Other</option>
            </select>


            <label className="block font-bold mb-2" htmlFor="message">Enquiry</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Write your enquiry..."
              required
              className="w-full p-3 border-none rounded-lg bg-white text-gray-600 text-base mb-5 transition-all duration-300 placeholder:text-light-pink"
            ></textarea>

            <button
              type="submit"
              className="w-full p-3.5 text-base font-bold bg-black text-white rounded-full border-none cursor-pointer transition-all duration-300 shadow-custom hover:bg-grey-400 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              
            >
              Submit
            </button>
            <Link to="/" className="hover:text-purple-600">
            Back
            </Link>
          </form>
        </div>

        

        
      </div>
    </section>
  );
}