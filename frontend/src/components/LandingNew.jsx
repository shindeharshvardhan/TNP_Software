import React, { useEffect, useState, useRef } from "react";
import Dome from "../assets/Final-2.png";
import MinimalNavbar from "../MinimalNavbar";
import Footer from "./Footer";
import StudentImg from "../assets/girl on graduation-pana.svg";
import CoordinatorImg from "../assets/Work in progress-cuate.svg";
import { ThreeDCardDemo } from "../test";
import ScrollButton from "../ScrollButton";
import Clould1 from "../assets/cloud-1.png";
import Clould2 from "../assets/cloud-2.png";

function LandingNew() {
  const [highlightPercentage, setHighlightPercentage] = useState(0);
  const [showHeroText, setShowHeroText] = useState(1);
  const [applyBWFilter, setApplyBWFilter] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isFixed, setIsFixed] = useState(false);
  const [showImageText, setShowImageText] = useState(0);
  const heroRef = useRef(null);
  const lastDivRef = useRef(null);
  const lightDivRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroTop = heroRef.current.offsetTop;
        const heroHeight = heroRef.current.clientHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollPosition >= heroTop + heroHeight - windowHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
          setApplyBWFilter(false);
          setBgOpacity(1);
          setShowImageText(0);
        }

        if (isFixed) {
          const fixedScrollPosition =
            scrollPosition - (heroTop + heroHeight - windowHeight);
          const fixedScrollPercentage = fixedScrollPosition / windowHeight;

          setApplyBWFilter(fixedScrollPercentage >= 0.1);
          setBgOpacity(1 - Math.min(fixedScrollPercentage * 2, 1));

          // Gradually fade in and highlight the image text with delay
          if (fixedScrollPercentage >= 0.2) {
            // setTimeout(() => {
            setShowImageText(Math.min(fixedScrollPercentage * 2, 1));
            // }, 150);
          }
          setHighlightPercentage(
            Math.max((fixedScrollPercentage - 0.5) * 2 * 100, 0)
          );
        }

        const scrollWithinHero = Math.max(scrollPosition - heroTop, 0);
        const scrollPercentage = scrollWithinHero / heroHeight;
        setHighlightPercentage(Math.min(scrollPercentage * 550, 100));
        setShowHeroText(scrollPercentage < 0.30 ? 1 : 0);
      }

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Set rotation based on scroll position
      const rotation = (scrollPosition / (documentHeight - windowHeight)) * 180;
      setRotationDegree(rotation);

      // Check if we're near the bottom of the page
      setIsAtBottom(scrollPosition + windowHeight >= documentHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDarkBackground(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (lightDivRef.current) {
      observer.observe(lightDivRef.current);
    }

    return () => {
      if (lightDivRef.current) {
        observer.unobserve(lightDivRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const halfwayPoint = documentHeight / 2;

    if (isAtBottom || scrollPosition >= documentHeight - windowHeight - 10) {
      // Scroll to top if at the bottom or last div
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (scrollPosition < halfwayPoint) {
      // Scroll to last div if closer to top
      lastDivRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      // Scroll to top if closer to bottom
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <MinimalNavbar
        fontColor={applyBWFilter ? "" : "text-white"}
        isLogo={false}
        titleweight="semibold"
      />
      <div className="w-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Scroll button */}
        <ScrollButton
          isDarkBackground={isDarkBackground}
          handleButtonClick={handleButtonClick}
          rotationDegree={rotationDegree}
        />

        {/* Hero Section */}
        <div
          ref={heroRef}
          style={{ height: "200vh" }}
          className="w-full relative transition-all duration-500"
        >
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom, rgba(59, 130, 246, ${bgOpacity}), rgba(79, 70, 229, ${
                bgOpacity / 4.5
              }))`,
              zIndex: 1,
            }}
          ></div>

          <p
            className="text-3xl leading-10 tracking-tight text-center fixed left-1/2 -translate-x-1/2 top-1/4 text-white transition-opacity duration-500"
            style={{
              opacity: showHeroText,
              filter: `blur(${(1 - showHeroText) * 7}px)`,
              zIndex: 2,
            }}
          >
            "Streamlining Success – Connecting Students and <br />
            Coordinators for a Seamless{" "}
            <span
              className="black-highlight"
              style={{
                background: `linear-gradient(to right, black ${highlightPercentage}%, transparent ${highlightPercentage}%)`,
                color: "white",
                padding: "0 4px",
              }}
            >
              placement journey.
            </span>
            "
          </p>

          <div className="absolute top-1/3 flex justify-center items-center z-[10]">
          <img src={Clould1} alt="cloud-1" className="w-2/3"/>
          <img src={Clould2} alt="cloud-1" className="w-1/3"/>
          </div>

          <div
            className="absolute inset-0 flex justify-center items-center transition-opacity duration-500"
            style={{ zIndex: 3, opacity: applyBWFilter ? 1 : 0 }}
          >
            <div className="bg-indigo-500 rounded-full w-1/2 aspect-square fixed -bottom-20"></div>
          </div>

          <img
            src={Dome}
            alt="Placement Journey"
            className={`w-full z-[10] transition-opacity duration-700 ${
              applyBWFilter ? "filter grayscale" : ""
            } ${isFixed ? "fixed bottom-0" : "absolute bottom-0"}`}
            style={{
              opacity: 1,
            }}
          />

          {/* New Image Text */}
          <div
            className="text-4xl font-lighter px-8 py-3 bg-black text-white fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
            style={{
              opacity: showImageText,
              zIndex: 10,
              fontFamily: "'Noto Sans Devanagari', sans-serif",
            }}
          >
            सत्यम् शिवम् सुंदरम् ||
          </div>
        </div>

        {/* Additional Content */}
        <div
          className="w-full mt-[100vh] h-screen pt-20 text-center bg_purple_image bg-white text-black flex flex-col items-center justify-center"
          ref={lightDivRef}
        >
          <h2 className="text-4xl tracking-tight font-bold text-black">
            <span className="text-9xl font-bold text-indigo-500 inline-block align-base">
              W
            </span>
            hy Does a T&P Platform Matter?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed px-4">
            A Training & Placement website bridges the gap between students and
            coordinators, offering a streamlined platform for tracking
            placements, updates, and training resources. It provides students
            with real-time access to opportunities and recruiters, while
            coordinators efficiently manage schedules, applications, and
            communications—creating a smoother, more effe3ctive placement
            journey for all.
          </p>
        </div>
        <div
          className="w-full h-screen bg_purple_image bg-indigo-600 flex flex-col items-center justify-center gap-10 text-center"
          ref={lastDivRef}
        >
          <h2 className="text-4xl font-semibold text-white">
            Choose Your Role to Login:
          </h2>
          <div className="w-full flex items-center justify-center space-x-8">
            {/* Student Card */}
            <ThreeDCardDemo
              link="/student_registration"
              title="Student"
              image={StudentImg}
            />

            {/* OR Text */}
            <p className="text-white font-bold text-2xl">OR</p>

            {/* Coordinator Card */}
            <ThreeDCardDemo
              link="/cdashboard"
              title="Coordinator"
              image={CoordinatorImg}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LandingNew;
