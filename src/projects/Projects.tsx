import React, { useState } from 'react';
import SearchForm from './stack-api/SearchForm';
import AmortizationSchedule from './loan-amortization/AmortizationSchedule';
import './Projects.scss';
import { VisualTheme } from '../App';

export default function Projects({theme}: {theme: VisualTheme}) {
  const [selectedProject, setSelectedProject] = useState('searchForm');

  function getSelectedProject() {
    switch (selectedProject) {
      case 'searchForm':
        return <SearchForm />;
      case 'loanAmortization':
        return <AmortizationSchedule theme={theme} />;
    }
  }

  return <div className="project-container">
    <div className="project-navigation">
      <div className={`project-navigation-button ${theme}`} onClick={() => setSelectedProject('searchForm')}>Stack API</div>
      <div className={`project-navigation-button ${theme}`} onClick={() => setSelectedProject('loanAmortization')}>Loan Calculator</div>
    </div>
    <div className={`page-container ${theme}`}>
      {getSelectedProject()}
    </div>
  </div>;
}