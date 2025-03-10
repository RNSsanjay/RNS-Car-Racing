import React, { useState, useRef, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Scene from "./Scene";

const HomePage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const mouse = useRef([0, 0]);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    if (isRotating) {
      const { clientX } = event;
      const { innerWidth } = window;
      mouse.current = [(clientX / innerWidth) * 2 - 1, 0]; // Keep y-position fixed
    }
  };

  const handleDoubleClick = () => {
    setIsRotating(true);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  const handleStartGame = () => {
    navigate("/racing-game");
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isRotating]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Car Background */}
      <div className="absolute inset-0 z-0 mt-40">
        <Suspense fallback={<div className="w-full h-full bg-white flex items-center justify-center">Loading 3D Model...</div>}>
          <Scene mouse={mouse} isRotating={isRotating} />
        </Suspense>
      </div>

      {/* Racing stripe elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-red-600 opacity-80 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-red-600 opacity-80 z-10"></div>
      <div className="absolute -left-10 top-0 h-full w-24 bg-red-600 opacity-80 transform -rotate-12 z-10"></div>
      <div className="absolute -right-10 top-0 h-full w-24 bg-red-600 opacity-80 transform rotate-12 z-10"></div>

      {/* Main content container */}
      <div className="z-20 w-full max-w-4xl px-6 py-16 mx-auto my-auto">
        {/* Logo and title */}
        <div className="text-center mb-12 bg-white bg-opacity-80 p-6 rounded-lg">
          <h1 className="text-5xl font-bold text-red-600 mb-2 tracking-wide">RNS GAMING</h1>
          <h2 className="text-3xl font-semibold text-gray-800">Ultimate Car Racing Experience</h2>
        </div>

        {/* Start game button */}
        <div className="flex justify-center mb-16">
          <button
            className={`bg-red-600 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform transition-all duration-300 ${isHovering ? "scale-110" : ""}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleStartGame}
          >
            START GAME
            <div className={`w-full h-1 bg-white mt-1 transition-all duration-300 ${isHovering ? "w-full" : "w-0"}`}></div>
          </button>
        </div>
      </div>

      {/* About section below the car animation with animation */}
      <div className="z-20 w-full max-w-4xl px-6 py-16 mx-auto my-auto mt-80 animate-fade-in">
        <div className="bg-white bg-opacity-90 border-l-4 border-red-600 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-red-600 mb-4">About Our Game</h3>
          <p className="text-gray-800 mb-4">
            Welcome to RNS Gaming's premier car racing experience! Our game offers incredibly realistic physics, stunning graphics, and heart-pounding action across multiple race tracks and environments.
          </p>
          <p className="text-gray-800 mb-4">
            Choose from dozens of high-performance vehicles, customize your ride, and compete against friends or AI opponents in various race modes including circuit racing, drift challenges, and open-world exploration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded border-t-2 border-red-600 shadow transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-red-600">Stunning Graphics</h4>
              <p className="text-sm text-gray-700">Race through photorealistic environments with dynamic weather and lighting.</p>
            </div>
            <div className="bg-white p-4 rounded border-t-2 border-red-600 shadow transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-red-600">Multiple Vehicles</h4>
              <p className="text-sm text-gray-700">Choose from over 50 vehicles with unique handling and performance characteristics.</p>
            </div>
            <div className="bg-white p-4 rounded border-t-2 border-red-600 shadow transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-red-600">Online Multiplayer</h4>
              <p className="text-sm text-gray-700">Challenge friends and competitors from around the world in adrenaline-pumping races.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 bg-white bg-opacity-80 p-4 rounded-lg">
        <p className="text-gray-600">© 2025 RNS Gaming. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
