import React, { useEffect, useRef, useState } from "react";
import { PinContainer } from "./3d-pin";
import { Meteors } from "./meteors";
import ExperienceCard from "./ExperienceCard";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

const Timeline = () => {
  return (
    <div className="wrapper">
      <div id="timeline" className="timeline" />
      <div className="circleWrapper">
        <div
          className={`message-right inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
        >
          Jan - Apr 2024
        </div>
        <div id="circle" className="circle"></div>
        <ExperienceCard
          company="aSocial.inc"
          role="Founding Engineer"
          title="Helping over 7000 users stay focused with Lock In Focus, a productivity app that blocks distracting apps."
          url="https://apps.apple.com/ca/app/lock-in-focus-app-blocker/id6472232979"
          className="message-left"
        />
      </div>
      <div id="timeline1" className="timeline" />
      <div className="circleWrapper">
        <div
          className={`message-left inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
        >
          Jan - Apr 2024
        </div>
        <div id="circle1" className="circle"></div>
        <ExperienceCard
          company="Pinewheel.ai"
          role="Front-end Engineer"
          title="Chatbot interface development using React and Tailwind"
          url="https://pinewheel.ai/"
          className="message-right"
        />
      </div>
      <div id="timeline2" className="timeline" />
      <div className="circleWrapper">
        <div
          className={`message-right inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
        >
          May - Aug 2023
        </div>
        <div id="circle2" className="circle"></div>
        <ExperienceCard
          company="DNAstack"
          role="Software Developer"
          title="DNAstack client library development using Python. Workbench azure marketplace app development using ASP.NET and C#"
          url="https://www.dnastack.com/"
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
          title="Internal tools development used by 5+ teams"
          url="https://www.enlightedinc.com/"
          className="message-right"
        />
      </div>
      <div id="timeline4" className="timeline" />
      <div className="circleWrapper">
        <div
          className={`message-right inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
        >
          Jan - Apr 2022
        </div>
        <div id="circle4" className="circle"></div>
        <ExperienceCard
          company="HomeX"
          role="Software Developer"
          title="Mobile and web development using Flutter and Dart"
          url="https://www.homex.com/"
          className="message-left"
        />
      </div>
      <div id="timeline5" className="timeline" />
      <div className="circleWrapper">
        <div
          className={`message-left inline-block whitespace-nowrap text-[#ddd] ${inconsolata.className}`}
        >
          May - Aug 2021
        </div>
        <div id="circle5" className="circle"></div>
        <ExperienceCard
          company="Bentley Systems"
          role="Software Developer"
          title="Digital Twin visualization software development using React and Selenium"
          url="https://www.bentley.com/software/plantsight/"
          className="message-right"
        />
      </div>
    </div>
  );
};

export default Timeline;
