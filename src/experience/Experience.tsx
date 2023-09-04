import React, { useState } from 'react';
import { VisualTheme } from '../App';
import Resume from './resume/Resume';
import Verizon from './verizon/Verizon';

export default function Projects({theme}: {theme: VisualTheme}) {
  const [selectedPage, setSelectedPage] = useState('verizon');

  function getSelectedProject() {
    switch (selectedPage) {
      case 'resume':
        return <Resume theme={theme} />;
      case 'verizon':
        return <Verizon theme={theme} />
    }
  }

  return <div className="project-container">
    <div className="project-navigation">
      <div className={`project-navigation-button ${theme}`} onClick={() => setSelectedPage('verizon')}>Verizon</div>
      <div className={`project-navigation-button ${theme}`} onClick={() => setSelectedPage('resume')}>Resume</div>
    </div>
      {getSelectedProject()}
  </div>;
}