"use client";
import Image from "next/image";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import Timeline from "../components/ui/Timeline";
import { SparklesCore } from "@/components/ui/sparkles";
import TimelineObserver from "react-timeline-animation";
import "./globals.css";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Inconsolata } from "next/font/google";
import Topbar from "@/components/ui/navbar";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function Home() {
    const words = [
        { text: "Software" },
        { text: "developer," },
        { text: "Front-end" },
        { text: "and" },
        { text: "app" },
        { text: "developer." },
    ];

    const toggleDarkmode = () => {
        document.documentElement.classList.toggle("dark");
    };

    const onCallback = () => {
        console.log("awesome");
    };

    const projects = [
        {
            title: "Watfriends",
            description:
                "Watfriends is a platform created by me and my friends to help university students network during the pandemic. We managed to gather over 250 users during the first week of launch!",
            link: "https://watfriends.onrender.com/",
        },
        {
            title: "Matr",
            description:
                "Matr is a platform designed for the foster care system, featuring an app for children to record their feelings and a web application for caseworkers to monitor their emotional well-being using sentiment analysis, enhancing support and care management. This project won the Deloitte chanllenge and Wolfram Award at uOttaHack 3!",
            link: "https://devpost.com/software/matr-2zsev8",
        },
        {
            title: "MediStand",
            description:
                "MediStand is a new healthcare system for public hospitals in economically disadvantaged areas, introducing kiosks for vital signs measurements to improve accessibility and an app to eliminate paperwork, enabling early disease prevention and data collection for infection prediction. This project won the Microsoft challenge at McHacks 7!",
            link: "https://devpost.com/software/medistand-idkjgo",
        },
        {
            title: "Jammming",
            description:
                "Jamming allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account. Created using React, boostrap and Spotify API.",
            link: "https://jammmingplaylistmaker.surge.sh/",
        },
        {
            title: "Canvas",
            description:
                "Canvas is a web application enabling users to draw and edit images on a blank canvas and sync them in real time to a database. Created using Angular, Fabric.js, and Firebase.",
            link: "https://github.com/yashyr7/CanvasPencil",
        },
        {
            title: "ChatPDF",
            description:
                "ChatPDF is a chat bot that answers to user queries using the knowledge base that the user provides. Users can upload pdf documents to establish the knowledge base and ask queestions. Created using Python and ChatGPT API.",
            link: "https://github.com/yashyr7/ChatPDF",
        },
    ];

    return (
        <div className="bg-slate-950">
            <Topbar />
            <div
                id="home"
                className="flex justify-center h-[93.5vh] w-screen heading-gradient-bg"
            >
                <div className="w-full absolute inset-0 h-full">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={2.5}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="mt-60">
                    <div className="flex flex-col">
                        <div
                            className={`md:text-9xl p-4 text-center z-10 sm:text-8xl text-7xl font-bold tracking-tight heading-text m-auto`}
                        >
                            Yash Rathore
                        </div>
                        <TypewriterEffect
                            className={`w-full z-10 ${inconsolata.className}`}
                            words={words}
                        />
                    </div>
                </div>
            </div>
            <div id="experience" className="pb-20">
                <LampContainer>
                    <motion.h1
                        initial={{ opacity: 0.5, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-0 py-4 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                    >
                        Experience
                    </motion.h1>
                </LampContainer>
                <div>
                    <TimelineObserver
                        initialColor="black"
                        fillColor="red"
                        handleObserve={(setObserver) => (
                            <Timeline
                                callback={onCallback}
                                setObserver={setObserver}
                            />
                        )}
                    />
                </div>
            </div>
            <div id="projects">
                <LampContainer>
                    <motion.h1
                        initial={{ opacity: 0.5, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-0 py-4 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                    >
                        Projects
                    </motion.h1>
                </LampContainer>
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={projects} />
                </div>
            </div>
            <div
                id="contact"
                className="flex p-20 flex-col items-center justify-center footer-gradient-bg"
            >
                <div className="flex flex-row justify-center items-center mb-8">
                    <a
                        href="https://www.linkedin.com/in/yashyr7/"
                        className="mx-4"
                    >
                        <Image
                            src="/linkedin.svg"
                            alt={""}
                            width={40}
                            height={50}
                        ></Image>
                    </a>
                    <a href="https://github.com/yashyr7">
                        <Image
                            src="/github.svg"
                            width={40}
                            height={50}
                            alt={""}
                        ></Image>
                    </a>
                </div>
                <div className={`text-s ${inconsolata.className}`}>
                    Made with love by Yash Rathore
                </div>
            </div>
        </div>
    );
}
