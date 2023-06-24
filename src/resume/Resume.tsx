import React, { useState } from 'react';

import './Resume.scss';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, ExperienceItem } from './experience';
import { Collapse } from '@mui/material';

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
            <div className="experience-item-dates">
               {item.dateRange}
            </div>
            <div className="experience-item-assignment">
               <div className="experience-item-position">
                  {item.title},
               </div>
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

export default function Resume() {
   return <div className='resume-container'>
      <TitleBlock />

      <div className="personal-statement">Technology obsessed, passionate engineer proficient in Front End Web Development technologies</div>

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
                  <div className="skills-item">Proficient in HTML and CSS/SCSS</div>
               </li>
               <li>
                  <div className="skills-item">Experienced with unit testing/Jest</div>
               </li>
               <li>
                  <div className="skills-item">Proficient in front-end libraries: React, Redux, RxJS, MobX, Material UI, Bootstrap</div>
               </li>
               <li>
                  <div className="skills-item">Experienced interfacing with APIs and building APIs using Node and Python</div>
               </li>
            </ul>





         </div>
      </div>
   </div>
}