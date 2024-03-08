import React, { useEffect, useRef, useState } from "react";
import { PinContainer } from "./3d-pin";
import { Meteors } from "./meteors";
import ExperienceCard from "./ExperienceCard";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

interface TimelineProps {
    setObserver: (element: Element, callback?: () => void) => void;
    callback: () => void | undefined;
}

const Timeline: React.FC<TimelineProps> = ({ setObserver, callback }) => {
    return (
        <div className="wrapper">
            <div id="timeline1" className="timeline" />
            <div className="circleWrapper">
                <div
                    className={`message-left inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
                >
                    May - Aug 2021
                </div>
                <div id="circle1" className="circle"></div>
                <ExperienceCard
                    company="Bentley Systems"
                    role="Software Developer"
                    url="https://www.bentley.com/"
                    className="message-right"
                />
            </div>
            <div id="timeline2" className="timeline" />
            <div className="circleWrapper">
                <div
                    className={`message-right inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
                >
                    Jan - Apr 2022
                </div>
                <div id="circle2" className="circle"></div>
                <ExperienceCard
                    company="HomeX"
                    role="Software Developer"
                    url="https://www.homex.com/"
                    className="message-left"
                />
            </div>
            <div id="timeline3" className="timeline" />
            <div className="circleWrapper">
                <div
                    className={`message-left inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
                >
                    Aug - Dec 2022
                </div>
                <div id="circle3" className="circle"></div>
                <ExperienceCard
                    company="Enlighted"
                    role="Front-end Developer"
                    url="https://www.enlightedinc.com/"
                    className="message-right"
                />
            </div>
            <div id="timeline4" className="timeline" />
            <div className="circleWrapper">
                <div
                    className={`message-right inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
                >
                    May - Aug 2023
                </div>
                <div id="circle4" className="circle"></div>
                <ExperienceCard
                    company="DNAstack"
                    role="Software Developer"
                    url="https://www.dnastack.com/"
                    className="message-left"
                />
            </div>
            <div id="timeline4" className="timeline" />
            <div className="circleWrapper">
                <div
                    className={`message-left inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
                >
                    Jan - Apr 2024
                </div>
                <div id="circle4" className="circle"></div>
                <ExperienceCard
                    company="Pinewheel.ai"
                    role="Front-end Engineer"
                    url="https://pinewheel.ai/"
                    className="message-right"
                />
            </div>
        </div>
    );
};

export default Timeline;
