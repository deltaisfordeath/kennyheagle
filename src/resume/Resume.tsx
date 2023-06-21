import React, { useMemo, useState } from 'react';

import './Resume.scss';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from './experience';

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

function ExperienceSection() {
   const [expandExperience, setExpandExperience] = useState(false);

   return <div className='resume-section'>
      <div className="header-text">Experience</div>
      <div className="resume-section-content">
         {EXPERIENCE_ITEMS.map((item, index) => {
            return <div style={{...(index >= 1 && !expandExperience ? {margin: 0} : {}), ...(index > 1 && !expandExperience ? {maxHeight: 0, opacity: 0} : {})}} className="experience-item-container" key={`experience-item-${index}`}>
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
      </div>
      {EXPERIENCE_ITEMS.length > 2 && <div className="experience-section-expand" onClick={() => setExpandExperience(!expandExperience)}>
         {expandExperience ? 'Show Less' : 'Show More'}
      </div>}
   </div>
}

function EducationSection() {
   const [expandExperience, setExpandExperience] = useState(false);

   return <div className='resume-section'>
      <div className="header-text">Education</div>
      <div className="resume-section-content">
         {EDUCATION_ITEMS.map((item, index) => {
            return <div style={{...(index >= 1 && !expandExperience ? {margin: 0} : {}), ...(index > 1 && !expandExperience ? {maxHeight: 0, opacity: 0} : {})}} className="experience-item-container" key={`experience-item-${index}`}>
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
      </div>
      {EDUCATION_ITEMS.length > 2 && <div className="experience-section-expand" onClick={() => setExpandExperience(!expandExperience)}>
         {expandExperience ? 'Show Less' : 'Show More'}
      </div>}
   </div>
}

export default function Resume() {
   return <div className='resume-container'>
      <TitleBlock />
      <ExperienceSection />
      <EducationSection />
   </div>
}