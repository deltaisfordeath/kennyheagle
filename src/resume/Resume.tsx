import React, { useMemo, useState } from 'react';

import './Resume.scss';
import { EXPERIENCE_ITEMS } from './experience';

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

   const experienceItems = useMemo(() => {
      return expandExperience ? EXPERIENCE_ITEMS : EXPERIENCE_ITEMS.slice(0, 2);
   }, [expandExperience])

   return <div className='resume-section'>
      <div className="header-text">Experience</div>
      <div className="resume-section-content">
         {experienceItems.map((item, index) => {
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
               <div className="experience-section-expand" onClick={() => setExpandExperience(!expandExperience)} />
            </div>
         })}
      </div>
   </div>
}

export default function Resume() {
   return <div className='resume-container'>
      <TitleBlock />
      <ExperienceSection />
   </div>
}