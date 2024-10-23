import React from 'react'
import techo from '../assets/techo.jpg';
import Footer from './Footer'
import Student from "../assets/student.png"
import Coordinator from "../assets/coordinator.png"
import { Link } from "react-router-dom";
import Navbar from './Navbar'

function Landing() {
    return (
        <>
            <div className="max-w-screen-2xl container md:px-20 px-4 pt-20 h-screen flex flex-col-reverse md:flex-row">
                <div className="md:w-1/2 space-y-12 my-12 md:my-20 p-3">
                    <h1 className="text-4xl font-bold">Welcome to <br /> <span className="text-blue-500">the Training and Placement Cell</span> <br /> of the Faculty of Technology and Engineering, MSU.</h1>
                    <p className="text-xl">We are committed to empowering students with the skills, knowledge, and opportunities needed to excel in their professional journeys. Our cell connects students with leading industries, ensuring a bright future through internships and campus placements.</p>
                </div>
                <div className="md:w-1/2">
                    <img className='drop-shadow-2xl border-8' src={techo} alt="" />
                </div>
            </div>

            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-5'>Roles</h1>
                <div className='flex justify-around'>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img className='h-60' src={Student} alt="" />
                        </figure>
                        <div className="card-body items-center text-center bg-indigo-200">
                            <h2 className="card-title">Student</h2>
                            <div className="card-actions">
                                <Link to="/student_registration">
                                    <button className="btn btn-primary">Login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img className='h-60' src={Coordinator} alt="" />
                        </figure>
                        <div className="card-body items-center text-center bg-indigo-200">
                            <h2 className="card-title">Coordinator</h2>
                            <div className="card-actions">
                                <Link to="/coordinator_login">
                                    <button className="btn btn-primary">Login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl bg-blue-100 container md:p-20 md:my-28 px-4 pt-10 flex flex-col-reverse md:flex-row justify-center">
                <div className='text-center'>
                    <h1 className="text-4xl font-bold">The Maharaja Sayajirao University of Baroda</h1>
                    <h1 className="text-3xl font-bold text-blue-500">Faculty of Technology and Engineering</h1>
                    <div className='my-10 text-justify px-10'>
                        <p className='text-xl my-5'>The Faculty of Technology and Engineering at The Maharaja Sayajirao University of Baroda is a premier institution known for its excellence in engineering education and research. Established with a vision to cultivate innovation and technical expertise, the faculty offers a wide range of undergraduate, postgraduate, and doctoral programs across various engineering disciplines.</p>
                        <p className='text-xl my-5'>With state-of-the-art facilities, a highly qualified faculty, and a strong emphasis on practical learning, FTE nurtures students to become industry-ready professionals. The faculty maintains close ties with leading industries, offering students valuable internships, research projects, and placement opportunities. Through its commitment to academic rigor and real-world application, the faculty has consistently produced graduates who excel in their fields, contributing to the advancement of technology and society.</p>
                        <p className='text-xl my-5'>At FTE, students are encouraged to push boundaries, think creatively, and develop solutions that address real-world challenges, preparing them for successful careers in engineering and beyond.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Landing
