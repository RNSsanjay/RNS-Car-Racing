import React, { useState, useRef, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Scene from "./Scene";

const HomePage = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mouse = useRef([0, 0]);
  const navigate = useNavigate();

  // Check device type and handle resize
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "features", "about"];
      let currentSection = "home";
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse interaction handlers
  const handleMouseMove = (event) => {
    if (isRotating) {
      const { clientX } = event;
      const { innerWidth } = window;
      mouse.current = [(clientX / innerWidth) * 2 - 1, 0];
    }
  };

  const handleDoubleClick = () => setIsRotating(true);
  const handleMouseUp = () => setIsRotating(false);
  const handleStartGame = () => navigate("/racing-game");

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Event listeners
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600 rounded-full opacity-5"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600 rounded-full opacity-5"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-red-600 rounded-full opacity-5"></div>
      </div>
      
      {/* Racing checkered pattern - top */}
      <div className="fixed top-0 left-0 w-full h-8 bg-red-600 z-10 overflow-hidden pointer-events-none">
        <div className="flex">
          {[...Array(20)].map((_, i) => (
            <div key={`top-${i}`} className={`h-8 w-8 ${i % 2 === 0 ? 'bg-red-700' : 'bg-red-600'}`}></div>
          ))}
        </div>
      </div>
      
      {/* Racing checkered pattern - bottom */}
      <div className="fixed bottom-0 left-0 w-full h-8 bg-red-600 z-10 overflow-hidden pointer-events-none">
        <div className="flex">
          {[...Array(20)].map((_, i) => (
            <div key={`bottom-${i}`} className={`h-8 w-8 ${i % 2 === 0 ? 'bg-red-700' : 'bg-red-600'}`}></div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-red-600 shadow-lg' : 'bg-red-600 bg-opacity-90'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 animate-pulse">
              <h1 className="text-xl md:text-2xl font-bold text-white">RNS GAMING</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                  className={`${activeSection === 'home' ? 'text-white border-b-2 border-white' : 'text-red-100'} hover:text-white transition-colors duration-300`}
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                  className={`${activeSection === 'features' ? 'text-white border-b-2 border-white' : 'text-red-100'} hover:text-white transition-colors duration-300`}
                >
                  Features
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className={`${activeSection === 'about' ? 'text-white border-b-2 border-white' : 'text-red-100'} hover:text-white transition-colors duration-300`}
                >
                  About
                </a>
                <button 
                  onClick={handleStartGame}
                  className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Play Now
                </button>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Model */}
      <div id="home" className="relative h-screen flex flex-col items-center justify-center pt-16">
        {/* 3D Car Background */}
        <div className="absolute inset-0 z-0 animate-fadeIn">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-bounce text-red-600 font-semibold flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Game Assets...
              </div>
            </div>
          }>
            <Scene mouse={mouse} isRotating={isRotating} />
          </Suspense>
        </div>

        {/* Content overlay */}
        <div className="z-10 text-center px-4 sm:px-6 max-w-3xl transition-all duration-1000 animate-slideUpFade">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-red-600 drop-shadow-lg">
            Ultimate Racing Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the thrill of high-speed racing with stunning graphics and realistic physics
          </p>
          <button 
            onClick={handleStartGame}
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out shadow-lg hover:shadow-red-500/50 transform hover:scale-105 animate-pulse"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center">
              START RACING
              <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
          
          <div className="mt-8 text-sm text-gray-600 animate-pulse">
            <p>Double-click to rotate the car • {isMobile ? "Tap" : "Click"} the button to start</p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative">
        {/* Racing stripe decorations */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
        <div className="absolute -left-10 top-0 h-full w-20 bg-red-600 opacity-10 transform -rotate-45"></div>
        <div className="absolute -right-10 top-0 h-full w-20 bg-red-600 opacity-10 transform rotate-45"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slideUpFade">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Game Features</h2>
            <div className="h-1 w-20 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-300 animate-slideInFromLeft" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Stunning Graphics</h3>
              <p className="text-gray-600">Race through photorealistic environments with dynamic weather and lighting effects that push the boundaries of gaming visuals.</p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-300 animate-slideInFromLeft" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Vehicle Customization</h3>
              <p className="text-gray-600">Choose from over 50 vehicles with unique handling and performance characteristics. Customize every aspect from engine to paint.</p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-300 animate-slideInFromLeft" style={{animationDelay: '0.5s'}}>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Online Multiplayer</h3>
              <p className="text-gray-600">Challenge friends and competitors from around the world in high-stakes races with real-time leaderboards.</p>
            </div>
          </div>
          
          {/* Additional Feature Cards - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-300 animate-slideInFromLeft" style={{animationDelay: '0.7s'}}>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Realistic Physics Engine</h3>
                  <p className="text-gray-600">Experience true-to-life car handling, damage modeling, and weather effects that impact your driving performance.</p>
                </div>
              </div>
            </div>
            
            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-300 animate-slideInFromLeft" style={{animationDelay: '0.9s'}}>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Dynamic Environments</h3>
                  <p className="text-gray-600">Race in ever-changing conditions with day-night cycles, dynamic weather systems, and seasonal events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Game Section */}
      <section id="about" className="py-16 md:py-24 bg-white relative">
        <div className="absolute -top-2 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-8 text-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-red-50"></path>
          </svg>
        </div>
        
        {/* Racing stripes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-0 w-40 h-full bg-red-600 opacity-5 transform -rotate-12"></div>
          <div className="absolute -right-20 top-0 w-40 h-full bg-red-600 opacity-5 transform rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:space-x-10">
            {/* Image/Media section */}
            <div className="mb-10 lg:mb-0 lg:w-1/2 animate-slideInFromLeft">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-w-16 aspect-h-9 bg-white rounded-lg overflow-hidden shadow-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300">
                  {/* Placeholder for game screenshot or video */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-white">
                    <div className="text-red-600 text-lg font-bold">GAMEPLAY PREVIEW</div>
                  </div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse cursor-pointer">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content section */}
            <div className="lg:w-1/2 animate-slideInFromRight">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">About Our Game</h2>
              <p className="text-gray-700 mb-6">
                Welcome to RNS Gaming's premier car racing experience! Our game offers incredibly realistic physics, stunning graphics, and heart-pounding action across multiple race tracks and environments.
              </p>
              <p className="text-gray-700 mb-6">
                Choose from dozens of high-performance vehicles, customize your ride, and compete against friends or AI opponents in various race modes including circuit racing, drift challenges, and open-world exploration.
              </p>
              
              {/* Game stats with animated counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center bg-red-50 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-red-600 animate-pulse">50+</div>
                  <div className="text-sm text-gray-600">Vehicles</div>
                </div>
                <div className="text-center bg-red-50 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-red-600 animate-pulse">20</div>
                  <div className="text-sm text-gray-600">Race Tracks</div>
                </div>
                <div className="text-center bg-red-50 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-red-600 animate-pulse">4K</div>
                  <div className="text-sm text-gray-600">Graphics</div>
                </div>
                <div className="text-center bg-red-50 p-3 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-red-600 animate-pulse">60+</div>
                  <div className="text-sm text-gray-600">FPS</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-10">
                <button 
                  onClick={handleStartGame}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-red-600 rounded-lg shadow-2xl group"
                >
                  <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-700 rounded-full blur-md ease"></span>
                  <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                    <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-white rounded-full blur-md"></span>
                    <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-red-500 rounded-full blur-md"></span>
                  </span>
                  <span className="relative flex items-center">
                    Play Now
                    <svg className="w-5 h-5 ml-2 animate-bounceX" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator for bottom */}
        <div className="absolute -bottom-2 left-0 w-full overflow-hidden leading-none transform rotate-180">
          <svg className="relative block w-full h-8 text-red-50" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <h2 className="text-2xl font-bold text-red-500">RNS GAMING</h2>
            </div>
            
            <div className="mt-8 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p>&copy; 2025 RNS Gaming. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;