import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className='bg-black text-white flex justify-center py-8 space-y-4'>
        <footer>
            <h1 className='font-bold text-4xl flex justify-center'>UbuntuHub</h1>
            <div className="flex justify-center gap-5 mt-6">
        {/* Social media links are hovered and have got a glow hover effect */}
                <a
                  href=" "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-black text-2xl p-2.5 rounded-full transition-all duration-300 ease-in-out hover:bg-light-purple hover:text-accent-purple hover:shadow-[0_0_10px_#ffb6c1]"
                >
                  <FaGithub />
                </a>
                <a
                  href=" "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-black text-2xl p-2.5 rounded-full transition-all duration-300 ease-in-out hover:bg-light-purple hover:text-accent-purple hover:shadow-[0_0_10px_#ffb6c1]"
                >
                  <FaLinkedin />
                </a>
                <a
                  href=" "
                  target="_blank"
                  rel="noopener noreferrer"
                   className="text-white bg-black text-2xl p-2.5 rounded-full transition-all duration-300 ease-in-out hover:bg-light-purple hover:text-accent-purple hover:shadow-[0_0_10px_#ffb6c1]"
                >
                  <FaInstagram />
                </a>
              </div>
              <p>© 2026 UbuntuHub. Empowering township youth through community-powered micro-businesses.</p>
        </footer>
        
    </div>
  )
}

export default Footer;  