import React, { useState } from 'react';

import './Resume.scss';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, ExperienceItem } from './resume-experience';
import { Collapse } from '@mui/material';
import { VisualTheme } from '../../App';

function TitleBlock() {
   return (
      <div className="resume-title-block">
         <div className="title-block-name header-text">
            <span className="first-name">Kenny</span> <span className="last-name">Heagle</span>
         </div>
         <div className="title-block-physical-contact">
            Gilbert, AZ<div className="contact-separator" />714-585-7155
         </div>
         <div className="title-block-email">
            kennyheagle@gmail.com
         </div>
      </div>
   )
}

function RenderExperience({ items }: { items: ExperienceItem[] }) {
   return <>
      {items.map((item, index) => {
         return <div className="experience-item-container" key={`experience-item-${index}`}>
            {item.description !== '' && <div className="experience-item-dates">
               {item.dateRange}
            </div>}
            <div className="experience-item-assignment">
               <div className="experience-item-position">
                  {item.description === '' ? item.dateRange + ' · ' : ''}
                  {item.title}
               </div>
               <span className="experience-item-separator">·</span>
               <div className="experience-item-venue">
                  {item.venue}
               </div>
            </div>
            <div className="experience-item-description">
               {item.description}
            </div>
         </div>
      })}
   </>
}

function ExperienceSection({ title, items }: { title: string, items: ExperienceItem[] }) {
   const [expandExperience, setExpandExperience] = useState(false);

   return <div className='resume-section'>
      <div className="header-text">{title}</div>
      <div className="resume-section-content">
         <RenderExperience items={items.slice(0, 2)} />
         <Collapse in={expandExperience}>
            <RenderExperience items={items.slice(2)} />
         </Collapse>
         {items.length > 2 && <div className="experience-section-expand" onClick={() => setExpandExperience(!expandExperience)}>
            {expandExperience ? 'Show Less' : 'Show More'}
         </div>}
      </div>
   </div>
}

export default function Resume({ theme }: { theme: VisualTheme }) {
   return <div className="project-container">
      <div style={{ "--resume-text-accent": theme === 'light' ? 'rgb(40, 50, 210)' : 'rgb(150, 230, 255)' } as React.CSSProperties} className={`resume-container page-container ${theme}`}>
         <TitleBlock />

         <div className="personal-statement">Passionate about coding since my first Java class in 2008. Proficient in Front End Web Development.</div>

         <ExperienceSection title="Experience" items={EXPERIENCE_ITEMS} />
         <ExperienceSection title="Education" items={EDUCATION_ITEMS} />

         <div className="skills-section">
            <div className="header-text">Skills</div>
            <div className="skills-list-container">
               <ul>
                  <li>
                     <div className="skills-item">Proficient in programming languages: Java, Typescript, and Python.</div>
                  </li>
                  <li>
                     <div className="skills-item">Proficient in web development libraries: React, Redux, NextJS, GatsbyJS, RxJS, MobX, Material UI, Bootstrap.</div>
                  </li>
                  <li>
                     <div className="skills-item">Experienced with unit testing with Jest, and end-to-end testing with Playwright.</div>
                  </li>
                  <li>
                     <div className="skills-item">Proficient in HTML and CSS/SCSS.</div>
                  </li>
                  <li>
                     <div className="skills-item">Experienced interfacing with REST and GraphQL APIs and building APIs using Node and Python.</div>
                  </li>
                  <li>
                     <div className="skills-item">Keen attention to detail. Highly motivated self-starter. Excellent at prioritization and time management. Tenacious problem solver.</div>
                  </li>
               </ul>





            </div>
         </div>
      </div>
   </div>;


}