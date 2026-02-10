import React from 'react'
import { Link } from 'react-router-dom';
import community from "../assets/community.png";
import Ideas from "../assets/ideas.png";
import Marketplace from "../assets/Marketplace.png";


function Homepage() {
  //cards data
  const cards = [
    {
      title: "Problems",
      description:
        "Share issues impacting your community",
      borderColor: "border-amber-800",
      bgImage: community,
    },
    {
      title: "Ideas",
      description:
        "Explore solutions to tackle unemployment",
      borderColor: "border-blue-800",
      bgImage: Ideas,
    },
    {
      title: "Marketplace",
      description:
        "Find and offer local services within your community",
      borderColor: "border-purple-800",
      bgImage: Marketplace,
    },
  ];
  return (
    <div className="homepage ">
      {/* Overlay to darken background image and content stays above background */}
      <div className="relative z-10">
        {/*Header */}
        <h1 className="text-6xl font-bold text-center pt-24 text-white">UbuntuHub</h1>
        <div className="text-center text-white mt-4 mb-12 text-2xl font-semibold">
          {/* Subtitle  */}
          <p className=" inline-block px-8 border-b">Empowering Communities, Solving Unemployment!</p>
        </div>
        <p className="text-center text-white mt-4">Join UbuntuHub and help your community thrive! Post problems, share creative
        </p>
        <p className="text-center text-white mb-12">solutions, and find local services to create new opportunities for all</p>

        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center max-w-300 mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`group relative aspect-square w-70 rounded-2xl overflow-hidden 
                border-4 ${card.borderColor}
                transition-all duration-300 hover:-translate-y-2`}
                style={{
                  backgroundImage: `url(${card.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black/60 opacity-0 
                 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">

                  {/* Title (Always Visible) */}
                  <h3 className="text-2xl text-white font-bold drop-shadow-lg">
                    {card.title}
                  </h3>

                  {/* Description (Only on Hover) */}
                  <p
                    className="mt-2 text-sm text-white font-semibold 
                   opacity-0 translate-y-4
                   transition-all duration-300
                   group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="text-center text-white mb-12 font-semibold">
          <h1 className="text-2xl mb-4 inline-block px-8 border-b border-white">Together We Can Make a Difference!</h1>
          <p className="mb-4">Join UbuntuHub, Helping Every Community, Everywhere!</p>
          {/* Action button */}
          <Link to="/register">
            <button className="bg-linear-to-b from-green-500 via-emerald-500 to-teal-500 rounded-2xl px-6 py-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition duration-300 ease-out hover:-translate-y-1">Get Started Now!</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage